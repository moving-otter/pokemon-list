import {evolutionChainByIdSchema, EvolutionChainByIdParams} from './types';
import {getData} from '@/utils/poke-api-client';

/**
 * @method GET
 * @description 특정 포켓몬의 진화정보를 가져오는 API.
 * @param {EvolutionChainByIdParams} params 진화 ID를 포함하는 매개변수
 */
export async function getEvolutionChainById(params: EvolutionChainByIdParams) {
  const {id} = params;
  const data = await getData(`/evolution-chain/${id}`);

  return evolutionChainByIdSchema.parse(data); // 도감 데이터 유효성 검사
}
