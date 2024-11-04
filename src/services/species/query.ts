import {regionKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getSpeciesById} from './fetch';
import {SpeciesByIdParams} from './types';

export const speciesQueryService = {
  getById: (params: SpeciesByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: regionKeys.getById(id),
      queryFn: () => getSpeciesById(params),
      enabled: id !== 'undefined',
    });
  },
};
