import {SERVICE_KEYS} from '../service-keys';

export const evolutionChainKeys = {
  getById: (id: string) => [SERVICE_KEYS.EVOLUTION_CHAIN, id],
};
