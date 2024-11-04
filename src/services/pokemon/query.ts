import {pokemonKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {PokemonDetailParams, PokemonListParam} from './types';
import {getPokemonDetail, getPokemonList, getRegions} from './fetch';

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
  getRegions: () => {
    return queryOptions({
      queryKey: pokemonKeys.regions(),
      queryFn: () => getRegions(),
    });
  },
};
