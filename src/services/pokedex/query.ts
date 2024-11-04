import {pokedexKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getPokedexById} from './fetch';
import {PokedexByIdParams} from './types';

export const pokedexQueryService = {
  getById: (params: PokedexByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokedexKeys.getById(id),
      queryFn: () => getPokedexById(params),
      enabled: id !== 'undefined',
    });
  },
};
