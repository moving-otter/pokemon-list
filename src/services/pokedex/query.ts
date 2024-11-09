import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {PokedexByIdParams} from './types';
import {getPokedexById} from './fetch';
import {pokedexKeys} from './keys';

export const pokedexQueryService = {
  getById: (params: PokedexByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokedexKeys.getById(id),
      queryFn: () => getPokedexById(params),
      enabled: id !== undefinedString,
    });
  },
};
