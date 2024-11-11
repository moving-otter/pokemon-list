import {pokedexByIdSchema, PokedexByIdParams} from './types';
import {getData} from '@/utils/poke-api-client';

/**
 * @method GET
 * @description 특정 도감의 상세정보를 가져오는 API.
 * @param {PokedexByIdParams} params 도감 ID를 포함하는 매개변수
 */
export async function getPokedexById(params: PokedexByIdParams) {
  const {id} = params;
  const data = await getData(`/pokedex/${id}`);

  return pokedexByIdSchema.parse(data); // 도감 데이터 유효성 검사
}
