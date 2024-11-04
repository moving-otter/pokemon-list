import {SERVICE_KEYS} from '../service-keys';

export const pokemonKeys = {
  list: (params: unknown) => [SERVICE_KEYS.POKEMON, params],
  detail: (id: string) => [SERVICE_KEYS.POKEMON, id],
  regions: () => [SERVICE_KEYS.POKEMON, 'regions'],
};
