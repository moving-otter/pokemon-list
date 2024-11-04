import axios from 'axios';
import {pokemonApiBaseUrl} from '@/utils/constants';
import {regionsListSchema, regionByIdSchema, RegionByIdParams} from './types';

/**
 * @method GET
 * @description 지역정보를 가져오는 API.
 */
export async function getRegionsList() {
  const response = await axios.get(`${pokemonApiBaseUrl}/region`);

  return regionsListSchema.parse(response.data);
}

/**
 * @method GET
 * @description 특정 지역의 상세정보를 가져오는 API.
 * @param {RegionByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getRegionById(params: RegionByIdParams) {
  const {id} = params;
  const response = await axios.get(`${pokemonApiBaseUrl}/region/${id}`);

  return regionByIdSchema.parse(response.data);
}
