import {z} from 'zod';

export const pokemonSpeciesByIdSchema = z.object({
  evolution_chain: z.object({
    url: z.string(),
  }),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({
        name: z.string(),
      }),
    })
  ),
});
export const pokemonSpeciesByIdParamsSchema = z.object({
  id: z.string(),
});

export type PokemonSpeciesByIdSchema = z.infer<typeof pokemonSpeciesByIdSchema>;
export type PokemonSpeciesByIdParams = z.infer<typeof pokemonSpeciesByIdParamsSchema>;
