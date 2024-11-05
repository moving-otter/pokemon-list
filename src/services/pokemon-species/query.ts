import {queryOptions} from '@tanstack/react-query';
import {undefinedString} from '@/utils/constants';
import {pokemonSpeciesKeys} from './keys';
import {getPokemonSpeciesById} from './fetch';
import {PokemonSpeciesByIdParams} from './types';

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
