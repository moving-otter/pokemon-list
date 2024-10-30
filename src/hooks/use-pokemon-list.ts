import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const pokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export const usePokemonList = (page: number, limit: number) => {
  return useQuery(['pokemonList', page], async () => {
    const offset = (page - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return pokemonListSchema.parse(response.data);
  });
};
