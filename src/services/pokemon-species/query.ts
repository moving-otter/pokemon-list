import {pokemonSpeciesKeys} from './keys';
import {queryOptions} from '@tanstack/react-query';
import {getPokemonSpeciesById} from './fetch';
import {PokemonSpeciesByIdParams} from './types';

export const pokemonSpeciesQueryService = {
  getById: (params: PokemonSpeciesByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokemonSpeciesKeys.getById(id),
      queryFn: () => getPokemonSpeciesById(params),
      enabled: id !== 'undefined',
    });
  },
};
