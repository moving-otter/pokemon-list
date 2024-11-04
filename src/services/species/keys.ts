import {SERVICE_KEYS} from '../service-keys';

export const regionKeys = {
  getById: (id: string) => [SERVICE_KEYS.SPECIES, id],
};
