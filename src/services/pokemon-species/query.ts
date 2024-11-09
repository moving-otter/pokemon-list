import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {PokemonSpeciesByIdParams} from './types';
import {getPokemonSpeciesById} from './fetch';
import {pokemonSpeciesKeys} from './keys';

export const pokemonSpeciesQueryService = {
  getById: (params: PokemonSpeciesByIdParams) => {
    const {id} = params;

    return queryOptions({
      queryKey: pokemonSpeciesKeys.getById(id),
      queryFn: () => getPokemonSpeciesById(params),
      enabled: id !== undefinedString,
    });
  },
};
