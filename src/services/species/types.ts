import {z} from 'zod';

export const speciesByIdSchema = z.object({
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: z.object({
        name: z.string(),
      }),
    })
  ),
});
export const speciesByIdParamsSchema = z.object({
  id: z.string(),
});

export type SpeciesByIdSchema = z.infer<typeof speciesByIdSchema>;
export type SpeciesByIdParams = z.infer<typeof speciesByIdParamsSchema>;
