import {z} from 'zod';

export const pokemonsListSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      url: z.string().url(),
    })
  ),
});
export const pokemonsListParamsSchema = z.object({
  page: z.number(),
  limit: z.number(),
  enabled: z.boolean().optional(),
});

export const pokemonByIdSchema = z.object({
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
export const pokemonByIdParamsSchema = z.object({
  id: z.string(),
});

export const pokedexByIdSchema = z.object({
  pokemon_entries: z.array(
    z.object({
      pokemon_species: z.object({
        url: z.string(),
      }),
    })
  ),
});
export const pokedexByIdParamsSchema = z.object({
  id: z.string(),
});

export type PokemonsListSchema = z.infer<typeof pokemonsListSchema>;
export type PokemonsListParam = z.infer<typeof pokemonsListParamsSchema>;

export type PokemonByIdSchema = z.infer<typeof pokemonByIdSchema>;
export type PokemonByIdParams = z.infer<typeof pokemonByIdParamsSchema>;

export type PokedexByIdSchema = z.infer<typeof pokedexByIdSchema>;
export type PokedexByIdParams = z.infer<typeof pokedexByIdParamsSchema>;
