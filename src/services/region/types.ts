import {z} from 'zod';

export const regionsListSchema = z.object({
  count: z.number(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});

export const regionByIdSchema = z.object({
  pokedexes: z.array(
    z.object({
      url: z.string(),
    })
  ),
});
export const regionByIdParamsSchema = z.object({
  id: z.string(),
});

export type RegionsListSchema = z.infer<typeof regionsListSchema>;

export type RegionByIdSchema = z.infer<typeof regionByIdSchema>;
export type RegionByIdParams = z.infer<typeof regionByIdParamsSchema>;
