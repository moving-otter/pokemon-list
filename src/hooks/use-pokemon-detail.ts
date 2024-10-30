import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const pokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  sprites: z.object({
    front_default: z.string().url(),
  }),
});

export const usePokemonDetail = (id: string) => {
  return useQuery(['pokemonDetail', id], async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return pokemonDetailSchema.parse(response.data);
  });
};
