import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePokemonStore } from "../store/pokemonStore";

interface PokemonDetails {
  name: string;
  number: number;
  imageUrl: string;
  height: number;
  weight: number;
  types: string[];
}

// Fetching function for Pokémon data
const fetchPokemonListWithDetails = async (page: number, limit: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  const results = response.data.results;
  const count = response.data.count;

  const detailedData = await Promise.all(
    results.map(async (pokemon: { name: string; url: string }) => {
      const pokemonDetail = await axios.get(pokemon.url);
      const { id, height, weight, types, sprites } = pokemonDetail.data;

      return {
        name: pokemon.name,
        number: id,
        height,
        weight,
        types: types.map((type: { type: { name: string } }) => type.type.name),
        imageUrl: sprites.front_default,
      };
    })
  );

  return { detailedData, count };
};

// Custom hook using react-query to fetch Pokémon data
const usePokemonListWithDetails = (page: number, limit: number) => {
  const setTotalPages = usePokemonStore((state) => state.setTotalPages);

  const { data, isLoading, error } = useQuery(
    ["pokemonList", page, limit],
    () => fetchPokemonListWithDetails(page, limit),
    {
      onSuccess: (data) => {
        const totalPages = Math.ceil(data.count / limit);
        setTotalPages(totalPages); // Update zustand state with the total pages
      },
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes after last use
    }
  );

  return {
    pokemonList: data?.detailedData || [],
    isLoading,
    error,
  };
};

export default usePokemonListWithDetails;
