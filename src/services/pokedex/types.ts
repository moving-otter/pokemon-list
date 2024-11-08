import {z} from 'zod';

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

export type PokedexByIdSchema = z.infer;
export type PokedexByIdParams = z.infer;
