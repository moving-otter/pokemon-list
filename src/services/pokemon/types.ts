import {z} from 'zod';

export const pokemonListSchema = z.object({
  count: z.number(),
  results: z.array(z.object({url: z.string().url()})),
});

export const pokemonListParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
});

export const pokemonDetailSchema = z.object({
  name: z.string(),
  id: z.number(),
  height: z.number(),
  weight: z.number(),
  types: z.array(
    z.object({
      type: z.object({name: z.string()}),
    })
  ),
  sprites: z.object({
    front_default: z.string().url().nullable(),
  }),
});

export const pokemonDetailParamsSchema = z.object({
  id: z.string(),
});

export type PokemonListSchema = z.infer<typeof pokemonListSchema>;
export type PokemonListParam = z.infer<typeof pokemonListParamsSchema>;
export type PokemonDetailSchema = z.infer<typeof pokemonDetailSchema>;
export type PokemonDetailParams = z.infer<typeof pokemonDetailParamsSchema>;
