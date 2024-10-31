import axios from "axios";
import { usePokemonStore } from "@/store/pokemonStore";
import { useQuery, useQueries } from "@tanstack/react-query";

interface PokemonDetails {
  name: string;
  number: number;
  imageUrl: string;
  height: number;
  weight: number;
  types: string[];
}

// Fetching function for Pokémon list
const fetchPokemonList = async (page: number, limit: number) => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  return response.data; // Return the full response to use the count
};

// Fetching function for individual Pokémon details
const fetchPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  const { id, height, weight, types, sprites } = response.data;

  return {
    name: response.data.name,
    number: id,
    height,
    weight,
    types: types.map((type: { type: { name: string } }) => type.type.name),
    imageUrl: sprites.front_default,
  };
};

// Custom hook using react-query to fetch Pokémon data
const usePokemonListWithDetails = (page: number, limit: number) => {
  const setTotalPages = usePokemonStore((state) => state.setTotalPages);

  // Fetch the Pokémon list to get the count and the URLs for details
  const {
    data: pokemonListData,
    isLoading: isListLoading,
    error: listError,
  } = useQuery(
    ["pokemonList", page, limit],
    () => fetchPokemonList(page, limit),
    {
      onSuccess: (data) => {
        const totalPages = Math.ceil(data.count / limit);
        setTotalPages(totalPages); // Update zustand state with the total pages
      },
      staleTime: 5 * 60 * 1000, // Cache data for 5 minutes
      cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes after last use
    }
  );

  // Fetch details for each Pokémon using useQueries
  const pokemonDetailsQueries = useQueries({
    queries:
      pokemonListData?.results?.map((pokemon: { url: string }) => ({
        queryKey: ["pokemonDetails", pokemon.url],
        queryFn: () => fetchPokemonDetails(pokemon.url),
        enabled: !!pokemonListData, // Only run if the pokemonListData is available
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes for each Pokémon
      })) || [],
  });

  const pokemonList = pokemonDetailsQueries
    .map((query) => query.data)
    .filter((data) => data); // Filter out any undefined data

  return {
    pokemonList,
    isLoading:
      isListLoading || pokemonDetailsQueries.some((query) => query.isLoading), // Loading if either the list or any of the details are loading
    error:
      listError || pokemonDetailsQueries.find((query) => query.error)?.error, // Combine any errors
  };
};

export default usePokemonListWithDetails;
