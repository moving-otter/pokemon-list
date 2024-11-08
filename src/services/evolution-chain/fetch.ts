import {evolutionChainByIdSchema, EvolutionChainByIdParams} from './types';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 특정 포켓몬의 진화정보를 가져오는 API.
 * @param {EvolutionChainByIdParams} params 진화 ID를 포함하는 매개변수
 */
export async function getEvolutionChainById(params: EvolutionChainByIdParams) {
  const {id} = params;
  const response = await axios.get(`${pokemonApiBaseUrl}/evolution-chain/${id}`);

  return evolutionChainByIdSchema.parse(response.data); // 도감 데이터 유효성 검사
}
