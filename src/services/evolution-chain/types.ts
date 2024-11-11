import {z} from 'zod';

const EvolutionChainSchema: z.ZodType = z.lazy(() =>
  z.object({
    species: z.object({
      name: z.string(),
      url: z.string(),
    }),
    evolves_to: z.array(EvolutionChainSchema),
  })
);

export const evolutionChainByIdSchema = z.object({
  chain: EvolutionChainSchema,
});

export const evolutionChainByIdParamSchema = z.object({
  id: z.string(),
});

export type EvolutionChainByIdSchema = z.infer<typeof evolutionChainByIdSchema>;
export type EvolutionChainByIdParams = z.infer<typeof evolutionChainByIdParamSchema>;
