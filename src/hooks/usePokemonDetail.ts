import axios from "axios";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  types: z.array(
    z.object({
      type: z.object({
        name: z.string(),
      }),
    })
  ),
  sprites: z.object({
    front_default: z.string().url(),
  }),
});

export const usePokemonDetail = (id: string) => {
  return useQuery(["pokemonDetail", id], async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return pokemonDetailSchema.parse(response.data);
  });
};
