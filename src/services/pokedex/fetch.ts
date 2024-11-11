import {pokedexByIdSchema, PokedexByIdParams} from './types';
import {isMockMode, getMockData} from '@/utils/helper';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 특정 도감의 상세정보를 가져오는 API.
 * @param {PokedexByIdParams} params 도감 ID를 포함하는 매개변수
 */
export async function getPokedexById(params: PokedexByIdParams) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await getMockData('pokedex/get-pokedex-id').then((json) => (data = json));
  } else {
    const {id} = params;
    const response = await axios.get(`${pokemonApiBaseUrl}/pokedex/${id}`);
    data = response.data;
  }

  return pokedexByIdSchema.parse(data); // 도감 데이터 유효성 검사
}
