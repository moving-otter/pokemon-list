const KEYS = ['EVOLUTION_CHAIN', 'POKEDEX', 'POKEMON', 'POKEMON_SPECIES', 'REGION'] as const;

type KeyValueMatch<T extends readonly string[]> = {
  [K in T[number]]: K;
};

export const SERVICE_KEYS = KEYS.reduce((acc, key) => {
  acc[key] = key;
  return acc;
}, {} as Record) as KeyValueMatch;
