const KEYS = ['EVOLUTION_CHAIN', 'POKEDEX', 'POKEMON', 'POKEMON_SPECIES', 'REGION'] as const;

// KeyValueMatch will map each key to itself, so each key in KEYS gets the same value type (itself).
type KeyValueMatch<T extends readonly string[]> = {
  [K in T[number]]: K;
};

// Properly define the type for the accumulator in reduce
export const SERVICE_KEYS = KEYS.reduce(
  (acc, key) => {
    acc[key] = key; // This ensures that key and value are the same
    return acc;
  },
  {} as Record<string, string>
) as KeyValueMatch<typeof KEYS>; // Accumulator is now typed correctly
