import {SERVICE_KEYS} from '../service-keys';

export const regionKeys = {
  getList: () => [SERVICE_KEYS.REGION],
  getById: (id: string) => [SERVICE_KEYS.REGION, id],
};
