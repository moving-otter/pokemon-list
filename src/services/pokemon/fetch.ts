import {pokemonsListSchema, pokemonByIdSchema, PokemonByIdParams, PokemonsListParam} from './types';
import {getMockData, isMockMode} from '@/utils/helper';
import {pokemonApiBaseUrl} from '@/utils/constants';
import axios from 'axios';

/**
 * @method GET
 * @description 포켓몬의 전체 개수와 간단한 객체 리스트 가져오는 API.
 */
export async function getPokemonsList(params: PokemonsListParam) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await getMockData('pokemon/get-pokemon-offset-limit').then((json) => (data = json));
  } else {
    const {page, limit} = params;
    const response = await axios.get(
      `${pokemonApiBaseUrl}/pokemon?offset=${(page - 1) * limit}&limit=${limit}`
    );
    data = response.data;
  }

  return pokemonsListSchema.parse(data);
}

/**
 * @method GET
 * @description 포켓몬의 개별 상세정보를 가져오는 API.
 */
export async function getPokemonById(params: PokemonByIdParams) {
  let data: object;

  if (isMockMode()) {
    await new Promise((resolve) => setTimeout(resolve, 100));
    await getMockData('pokemon/get-pokemon-id').then((json) => (data = json));
  } else {
    const {id} = params;
    const response = await axios.get(`${pokemonApiBaseUrl}/pokemon/${id}`);
    data = response.data;
  }
  const validatedData = pokemonByIdSchema.parse(data);

  return {
    name: validatedData.name,
    number: validatedData.id,
    height: validatedData.height,
    weight: validatedData.weight,
    types: validatedData.types.map((type) => type.type.name),
    imageUrl: validatedData.sprites.front_default || '',
    speciesUrl: validatedData.species?.url,
  };
}
