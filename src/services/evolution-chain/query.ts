import {pokedexKeys as evolutionChainKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getEvolutionChainById} from './fetch';
import {EvolutionChainByIdParams} from './types';

export const evolutionChainQueryService = {
  getById: (params: EvolutionChainByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: evolutionChainKeys.getById(id),
      queryFn: () => getEvolutionChainById(params),
      enabled: id !== 'undefined',
    });
  },
};
