import axios from 'axios';
import {pokemonApiBaseUrl} from '@/utils/constants';
import {pokedexByIdSchema, PokedexByIdParams} from './types';

/**
 * @method GET
 * @description 특정 도감의 상세정보를 가져오는 API.
 * @param {PokedexByIdParams} params 도감 ID를 포함하는 매개변수
 */
export async function getPokedexById(params: PokedexByIdParams) {
  const {id} = params;
  const response = await axios.get(`${pokemonApiBaseUrl}/pokedex/${id}`);

  return pokedexByIdSchema.parse(response.data); // 도감 데이터 유효성 검사
}
