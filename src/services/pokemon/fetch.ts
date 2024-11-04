import axios from 'axios';
import {pokemonApiBaseUrl} from '@/utils/constants';
import {
  pokemonListSchema,
  pokemonDetailSchema,
  regionsSchema,
  PokemonDetailParams,
  PokemonListParam,
} from './types';

/**
 * @method GET
 * @description 포켓몬의 전체 개수와 간단한 객체 리스트 가져오는 API.
 */
export async function getPokemonList(params: PokemonListParam) {
  const {page, limit} = params;

  const response = await axios.get(
    `${pokemonApiBaseUrl}/pokemon?offset=${(page - 1) * limit}&limit=${limit}`
  );

  return pokemonListSchema.parse(response.data);
}

/**
 * @method GET
 * @description 포켓몬의 개별 상세정보를 가져오는 API.
 */
export async function getPokemonDetail(params: PokemonDetailParams) {
  const {id} = params;

  const response = await axios.get(`${pokemonApiBaseUrl}/pokemon/${id}`);
  const validatedData = pokemonDetailSchema.parse(response.data);

  return {
    name: validatedData.name,
    number: validatedData.id,
    height: validatedData.height,
    weight: validatedData.weight,
    types: validatedData.types.map((type) => type.type.name),
    imageUrl: validatedData.sprites.front_default || '',
  };
}

/**
 * @method GET
 * @description Regions 정보를 가져오는 API.
 */
export async function getRegions() {
  const response = await axios.get(`${pokemonApiBaseUrl}/region`); // 적절한 API 경로로 수정 필요
  return regionsSchema.parse(response.data); // regions 데이터 유효성 검사
}
