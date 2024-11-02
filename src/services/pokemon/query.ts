import {pokemonKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getPokemonDetail, getPokemonList} from './fetch';
import {PokemonDetailParams, PokemonListParam} from './types';

export const pokemonQueryService = {
  getList: (params: PokemonListParam) => {
    return queryOptions({
      queryKey: pokemonKeys.list(params),
      queryFn: () => getPokemonList(params),
    });
  },
  getById: (params: PokemonDetailParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokemonKeys.detail(id),
      queryFn: () => getPokemonDetail(params),
      enabled: id !== 'undefined',
    });
  },
};
