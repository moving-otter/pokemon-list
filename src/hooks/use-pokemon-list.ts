import axios from "axios";
import { z } from "zod";
import { useEffect } from "react";
import { usePokemonStore } from "@/store/pokemon-store";
import { useQuery, useQueries } from "@tanstack/react-query";
import { REACT_QUERY_OPTION, POKEMON_API_V2 } from "@/utils/constants";

// 유효성 검사를 위한 Zod 스키마 정의
const PokemonDetailsSchema = z.object({
  name: z.string(),
  id: z.number(),
  height: z.number(),
  weight: z.number(),
  types: z.array(
    z.object({
      type: z.object({ name: z.string() }),
    })
  ),
  sprites: z.object({
    front_default: z.string().url().nullable(),
  }),
});

const PokemonListSchema = z.object({
  count: z.number(),
  results: z.array(z.object({ url: z.string().url() })),
});

// Zod 스키마로부터 TypeScript 인터페이스 정의
type PokemonDetailsType = z.infer<typeof PokemonDetailsSchema>;
type PokemonListType = z.infer<typeof PokemonListSchema>;

// react-query를 사용하여 포켓몬 데이터를 가져오는 커스텀 훅
const usePokemonListWithDetails = (page: number, limit: number) => {
  const setTotalPages = usePokemonStore((state) => state.setTotalPages);
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);

  // 포켓몬 목록을 가져와서 카운트와 세부정보 URL을 얻기
  const {
    data: pokemonListData,
    isLoading: isListLoading,
    error: listError,
  } = useQuery(
    ["pokemonList", page, limit],
    async () => {
      const response = await axios.get(
        `${POKEMON_API_V2}/pokemon?offset=${(page - 1) * limit}&limit=${limit}`
      );

      return PokemonListSchema.parse(response.data);
    },
    {
      enabled:
        typeof page === "number" &&
        !isNaN(page) &&
        typeof limit === "number" &&
        !isNaN(limit), // page와 limit이 숫자인 경우에만 쿼리 실행
      onSuccess: (data) => {
        const totalPages = Math.ceil(data.count / limit);

        // 전체 페이지 수를 zustand 상태로 업데이트
        setTotalPages(totalPages);
      },
      staleTime: REACT_QUERY_OPTION.staleTime,
      cacheTime: REACT_QUERY_OPTION.cacheTime,
    }
  );

  // 각 포켓몬에 대한 세부 정보를 가져오기 위해 useQueries 사용
  const pokemonDetailsQueries = useQueries<PokemonDetailsType[]>({
    queries:
      pokemonListData?.results?.map((pokemon) => ({
        queryKey: ["pokemonDetails", pokemon.url],
        queryFn: async () => {
          const response = await axios.get(pokemon.url);
          const validatedData = PokemonDetailsSchema.parse(response.data);

          return {
            name: validatedData.name,
            number: validatedData.id,
            height: validatedData.height,
            weight: validatedData.weight,
            types: validatedData.types.map((type: any) => type.type.name),
            imageUrl: validatedData.sprites.front_default || "",
          };
        },
        // pokemonListData가 존재할 경우에만 실행
        enabled: !!pokemonListData,
        staleTime: REACT_QUERY_OPTION.staleTime,
        cacheTime: REACT_QUERY_OPTION.cacheTime,
      })) || [],
  });

  const pokemonList = pokemonDetailsQueries
    .map((query) => query.data)
    .filter((data) => data);

  // 모든 쿼리가 성공적으로 완료되었을 때 zustand에 리스트를 저장
  useEffect(() => {
    const allQueriesSuccessful = pokemonDetailsQueries.every(
      (query) => query.isSuccess
    );
    if (allQueriesSuccessful) {
      setPokemonList(pokemonList);
    }
  }, [pokemonDetailsQueries, setPokemonList]);

  return {
    pokemonList: pokemonList,
    // 목록 또는 세부 정보 중 하나라도 로딩 중일 때 true
    isLoading:
      isListLoading || pokemonDetailsQueries.some((query) => query.isLoading),
    // 오류를 결합하여 반환
    error:
      listError || pokemonDetailsQueries.find((query) => query.error)?.error,
  };
};

export default usePokemonListWithDetails;
