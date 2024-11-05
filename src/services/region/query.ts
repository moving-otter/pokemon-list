import {regionKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {RegionByIdParams} from './types';
import {getRegionsList, getRegionById} from './fetch';

export const regionQueryService = {
  getList: () => {
    return queryOptions({
      queryKey: regionKeys.getList(),
      queryFn: () => getRegionsList(),
    });
  },
  getById: (params: RegionByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: regionKeys.getById(id),
      queryFn: () => getRegionById(params),
      enabled: id !== undefinedString,
    });
  },
};
