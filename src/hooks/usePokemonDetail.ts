import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// Define the Zod schema for Pokémon details
const pokemonDetailSchema = z.object({
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

// Define the hook for fetching Pokémon details
export const usePokemonDetail = (id: string | undefined) => {
  return useQuery(
    ["pokemonDetail", id],
    async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`
      );
      return pokemonDetailSchema.parse(response.data);
    },
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: false, // Optional: prevent refetch when the window regains focus
      enabled: !!id, // Only run the query if id is defined
    }
  );
};
