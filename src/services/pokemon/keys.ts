import {SERVICE_KEYS} from '../service-keys';

export const pokemonKeys = {
  all: () => [SERVICE_KEYS.POKEMON, 'all'],
  lists: () => [...pokemonKeys.all(), 'list'],
  list: (params: unknown) => [...pokemonKeys.lists(), params],
  detail: (id: string) => [SERVICE_KEYS.POKEMON, id],
};
