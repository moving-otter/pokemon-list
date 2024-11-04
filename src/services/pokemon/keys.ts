import {SERVICE_KEYS} from '../service-keys';

export const pokemonKeys = {
  getList: (params: unknown) => [SERVICE_KEYS.POKEMON, params],
  getById: (id: string) => [SERVICE_KEYS.POKEMON, id],
};
