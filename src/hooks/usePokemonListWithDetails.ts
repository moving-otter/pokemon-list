import { useQuery, useQueries } from "@tanstack/react-query";
import axios from "axios";
import { usePokemonStore } from "../store/pokemonStore";

// 개별 포켓몬의 상세 데이터를 가져오는 fetch 함수
const fetchPokemonDetail = async (url: string) => {
  const response = await axios.get(url);
  const { id, height, weight, types, sprites } = response.data;
  return {
    number: id,
    height,
    weight,
    types: types.map((type: any) => type.type.name),
    imageUrl: sprites.front_default,
  };
};

// 포켓몬 리스트 데이터를 가져오는 함수
const fetchPokemonList = async (page: number, limit: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  return {
    results: response.data.results,
    count: response.data.count,
  };
};

// 포켓몬 리스트와 각 포켓몬의 상세 데이터를 가져오는 훅
const usePokemonListWithDetails = (page: number, limit: number) => {
  const setTotalPages = usePokemonStore((state) => state.setTotalPages);

  // 포켓몬 리스트 데이터를 먼저 가져옴
  const { data: listData, isLoading: isListLoading } = useQuery(
    ["pokemonList", page, limit],
    () => fetchPokemonList(page, limit),
    {
      onSuccess: (data) => {
        const totalPages = Math.ceil(data.count / limit);
        setTotalPages(totalPages);
      },
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );

  // 리스트 데이터를 통해 포켓몬 상세 데이터를 `useQueries`로 가져옴
  const pokemonDetailsQueries = useQueries(
    (listData?.results || []).map((pokemon: any) => ({
      queryKey: ["pokemonDetail", pokemon.url],
      queryFn: () => fetchPokemonDetail(pokemon.url),
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }))
  );

  const isDetailsLoading = pokemonDetailsQueries.some(
    (query) => query.isLoading
  );
  const hasError = pokemonDetailsQueries.some((query) => query.error);

  // 각 포켓몬 데이터가 모두 로딩되면 구조를 합쳐서 반환
  const pokemonList = pokemonDetailsQueries.map((query, index) => ({
    name: listData?.results[index].name,
    ...(query.data || {}),
  }));

  return {
    pokemonList,
    isLoading: isListLoading || isDetailsLoading,
    error: hasError,
  };
};

export default usePokemonListWithDetails;
