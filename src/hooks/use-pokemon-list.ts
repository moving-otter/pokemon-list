import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { z } from 'zod';

const pokemonListSchema = z.object({
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});

export const usePokemonList = () => {
  return useQuery(['pokemonList'], async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    return pokemonListSchema.parse(response.data).results;
  });
};
