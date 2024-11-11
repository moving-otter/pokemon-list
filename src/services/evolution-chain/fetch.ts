import {evolutionChainByIdSchema, EvolutionChainByIdParams} from './types';
import {getMockData, isMockMode} from '@/utils/helper';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 특정 포켓몬의 진화정보를 가져오는 API.
 * @param {EvolutionChainByIdParams} params 진화 ID를 포함하는 매개변수
 */
export async function getEvolutionChainById(params: EvolutionChainByIdParams) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await getMockData('evolution-chain/get-evolution-chain-id').then((obj) => (data = obj));
  } else {
    const {id} = params;
    const response = await axios.get(`${pokemonApiBaseUrl}/evolution-chain/${id}`);
    data = response.data;
  }

  return evolutionChainByIdSchema.parse(data); // 도감 데이터 유효성 검사
}
