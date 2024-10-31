import axios from "axios";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
import { REACT_QUERY_OPTION, POKEMON_API_V2 } from "@/utils/constants";

// Define the Zod schema for Pokémon details
const PokemonDetailSchema = z.object({
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

// Define TypeScript interfaces from Zod schema
type TPokemonDetailType = z.infer<typeof PokemonDetailSchema>;

// Define the hook for fetching Pokémon details
export const usePokemonDetail = (id: string | undefined) => {
  return useQuery<TPokemonDetailType>(
    ["pokemonDetail", id],
    async () => {
      const response = await axios.get(`${POKEMON_API_V2}/pokemon/${id}`);
      
      return PokemonDetailSchema.parse(response.data);
    },
    {
      enabled: !!id, // Only run the query if id is defined
      refetchOnWindowFocus: false, // Optional: prevent refetch when the window regains focus
      staleTime: REACT_QUERY_OPTION.staleTime,
      cacheTime: REACT_QUERY_OPTION.cacheTime,
    }
  );
};
