import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {EvolutionChainByIdParams} from './types';
import {getEvolutionChainById} from './fetch';
import {evolutionChainKeys} from './keys';

export const evolutionChainQueryService = {
  getById: (params: EvolutionChainByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: evolutionChainKeys.getById(id),
      queryFn: () => getEvolutionChainById(params),
      enabled: id !== undefinedString,
    });
  },
};
