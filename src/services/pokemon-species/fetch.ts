import {pokemonSpeciesByIdSchema, PokemonSpeciesByIdParams} from './types';
import {isMockMode, getMockData} from '@/utils/helper';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 특정 포켓몬의 설명 정보를 가져오는 API.
 * @param {PokemonSpeciesByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getPokemonSpeciesById(params: PokemonSpeciesByIdParams) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await getMockData('pokemon-species/get-pokemon-species-id').then((json) => (data = json));
  } else {
    const {id} = params;
    const response = await axios.get(`${pokemonApiBaseUrl}/pokemon-species/${id}`);
    data = response.data;
  }

  return pokemonSpeciesByIdSchema.parse(data);
}
