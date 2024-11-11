import {pokemonSpeciesByIdSchema, PokemonSpeciesByIdParams} from './types';
import {getData} from '@/utils/poke-api-client';

/**
 * @method GET
 * @description 특정 포켓몬의 설명 정보를 가져오는 API.
 * @param {PokemonSpeciesByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getPokemonSpeciesById(params: PokemonSpeciesByIdParams) {
  const {id} = params;
  const data = await getData(`/pokemon-species/${id}`);

  return pokemonSpeciesByIdSchema.parse(data);
}
