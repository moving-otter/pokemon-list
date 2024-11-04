import {SERVICE_KEYS} from '../service-keys';

export const pokedexKeys = {
  getById: (id: string) => [SERVICE_KEYS.POKEDEX, id],
};
