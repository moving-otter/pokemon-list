import {regionsListSchema, regionByIdSchema, RegionByIdParams} from './types';
import {getData} from '@/utils/poke-api-client';

/**
 * @method GET
 * @description 지역정보를 가져오는 API.
 */
export async function getRegionsList() {
  const data = await getData(`/region`);

  return regionsListSchema.parse(data);
}

/**
 * @method GET
 * @description 특정 지역의 상세정보를 가져오는 API.
 * @param {RegionByIdParams} params 지역 ID를 포함하는 매개변수
 */
export async function getRegionById(params: RegionByIdParams) {
  const {id} = params;
  const data = await getData(`/region/${id}`);

  return regionByIdSchema.parse(data);
}
