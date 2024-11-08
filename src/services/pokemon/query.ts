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
    });
  },
  getById: (params: PokemonByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokemonKeys.getById(id),
      queryFn: () => getPokemonById(params),
      enabled: id !== undefinedString,
    });
  },
};
