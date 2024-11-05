import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {evolutionChainKeys} from './keys';
import {getEvolutionChainById} from './fetch';
import {EvolutionChainByIdParams} from './types';

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
