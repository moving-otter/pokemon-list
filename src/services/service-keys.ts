const KEYS = ['POKEMON', 'REGION', 'POKEDEX', 'POKEMON_SPECIES', 'EVOLUTION_CHAIN'] as const;

type KeyValueMatch<T extends readonly string[]> = {
  [K in T[number]]: K;
};

export const SERVICE_KEYS = KEYS.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record<string, string>) as KeyValueMatch<typeof KEYS>;
