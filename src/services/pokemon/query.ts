import {PokemonByIdParams, PokemonsListParam} from './types';
import {getPokemonById, getPokemonsList} from './fetch';
import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {pokemonKeys} from './keys';

export const pokemonQueryService = {
  getList: (params: PokemonsListParam) => {
    return queryOptions({
      queryKey: pokemonKeys.getList(params),
      queryFn: () => getPokemonsList(params),
      enabled: params.enabled ?? true,
    });
  },
  getById: (params: PokemonByIdParams) => {
    const {id} = params;

    // skipToken: 특정 조건에 맞아야만 호출
    // enabled와 비슷하지만 enabled는 refetch에서 실행될 수 있는 문제가 있음 
    // useSuspense는 enabled, skipToken 둘 다 안됨 
    return queryOptions({
      queryKey: pokemonKeys.getById(id),
      queryFn: () => getPokemonById(params),
      enabled: id !== undefinedString,
    });
  },
};
