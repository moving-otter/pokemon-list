import {pokemonKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getPokemonDetail, getPokemonList} from './fetch';
import {PokemonDetailParams, PokemonListParam} from './types';

export const pokemonQueryService = {
  getList: (params: PokemonListParam) =>
    queryOptions({
      queryKey: pokemonKeys.list(params),
      queryFn: () => getPokemonList(params),
    }),
  getById: (params: PokemonDetailParams) => {
    const splitted = params?.url.split('/');
    const pocketmonId = splitted[splitted.length - 1];

    return queryOptions({
      queryKey: pokemonKeys.detail(params.url),
      queryFn: () => getPokemonDetail(params),
      enabled: pocketmonId !== 'undefined',
    });
  },
};
