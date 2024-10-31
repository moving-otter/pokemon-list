import axios from "axios";
import { usePokemonStore } from "@/store/pokemonStore";
import { useQuery, useQueries } from "@tanstack/react-query";
import { z } from "zod";

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
type PokemonDetails = z.infer<typeof PokemonDetailsSchema>;
type PokemonList = z.infer<typeof PokemonListSchema>;

// Fetching function for Pokémon list
const fetchPokemonList = async (
  page: number,
  limit: number
): Promise<PokemonList> => {
  const response = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      (page - 1) * limit
    }&limit=${limit}`
  );
  return PokemonListSchema.parse(response.data); // Validate using Zod
};

// Fetching function for individual Pokémon details
const fetchPokemonDetails = async (url: string) => {
  const response = await axios.get(url);
  const validatedData = PokemonDetailsSchema.parse(response.data); // Validate using Zod

  return {
    name: validatedData.name,
    number: validatedData.id,
    height: validatedData.height,
    weight: validatedData.weight,
    types: validatedData.types.map((type) => type.type.name),
    imageUrl: validatedData.sprites.front_default || "", // Handle nullable image
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
      pokemonListData?.results?.map((pokemon) => ({
        queryKey: ["pokemonDetails", pokemon.url],
        queryFn: () => fetchPokemonDetails(pokemon.url),
        enabled: !!pokemonListData, // Only run if the pokemonListData is available
        staleTime: 5 * 60 * 1000, // Cache data for 5 minutes for each Pokémon
        cacheTime: 30 * 60 * 1000, // Keep data in cache for 30 minutes after last use
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
