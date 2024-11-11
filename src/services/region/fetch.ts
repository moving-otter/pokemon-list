import {regionsListSchema, regionByIdSchema, RegionByIdParams} from './types';
import {getMockData, isMockMode} from '@/utils/helper';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 지역정보를 가져오는 API.
 */
export async function getRegionsList() {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await getMockData('region/get-region').then((json) => (data = json));
  } else {
    const response = await axios.get(`${pokemonApiBaseUrl}/region`);
    data = response.data;
  }

  return regionsListSchema.parse(data);
}

/**
 * @method GET
 * @description 특정 지역의 상세정보를 가져오는 API.
 * @param {RegionByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getRegionById(params: RegionByIdParams) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    await getMockData('region/get-region-id').then((json) => (data = json));
  } else {
    const {id} = params;
    const response = await axios.get(`${pokemonApiBaseUrl}/region/${id}`);
    data = response.data;
  }

  return regionByIdSchema.parse(data);
}
