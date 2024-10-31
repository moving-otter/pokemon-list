import axios from "axios";
import { z } from "zod";
import { useEffect } from "react";
import { usePokemonStore } from "@/store/pokemon-store";
import { useQuery, useQueries } from "@tanstack/react-query";
import { REACT_QUERY_OPTION, POKEMON_API_V2 } from "@/utils/constants";

// Define Zod schemas for validation
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

// Define TypeScript interfaces from Zod schemas
type PokemonDetailsType = z.infer<typeof PokemonDetailsSchema>;
type PokemonListType = z.infer<typeof PokemonListSchema>;

// Custom hook using react-query to fetch Pokémon data
const usePokemonListWithDetails = (page: number, limit: number) => {
  const setTotalPages = usePokemonStore((state) => state.setTotalPages);
  const setPokemonList = usePokemonStore((state) => state.setPokemonList);

  // Fetch the Pokémon list to get the count and the URLs for details
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
        !isNaN(limit),
      onSuccess: (data) => {
        const totalPages = Math.ceil(data.count / limit);
        setTotalPages(totalPages);
      },
      staleTime: REACT_QUERY_OPTION.staleTime,
      cacheTime: REACT_QUERY_OPTION.cacheTime,
    }
  );

  // Fetch details for each Pokémon using useQueries
  const pokemonDetailsQueries = useQueries<PokemonListType[]>({
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
    pokemonList: pokemonList.length === limit ? pokemonList : [],
    isLoading:
      isListLoading || pokemonDetailsQueries.some((query) => query.isLoading),
    error:
      listError || pokemonDetailsQueries.find((query) => query.error)?.error,
  };
};

export default usePokemonListWithDetails;
