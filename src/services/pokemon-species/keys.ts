import {SERVICE_KEYS} from '../service-keys';

export const pokemonSpeciesKeys = {
  getById: (id: string) => [SERVICE_KEYS.POKEMON_SPECIES, id],
};
