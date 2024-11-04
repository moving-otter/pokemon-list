import axios from 'axios';
import {pokemonApiBaseUrl} from '@/utils/constants';
import {speciesByIdSchema, SpeciesByIdParams} from './types';

/**
 * @method GET
 * @description 특정 포켓몬의 설명 정보를 가져오는 API.
 * @param {SpeciesByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getSpeciesById(params: SpeciesByIdParams) {
  const {id} = params;
  const response = await axios.get(`${pokemonApiBaseUrl}/pokemon-species/${id}`);

  return speciesByIdSchema.parse(response.data);
}
