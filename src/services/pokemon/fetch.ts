import axios from 'axios';
import {
  pokemonListSchema,
  PokemonListParam,
  pokemonDetailSchema,
  PokemonDetailParams,
} from './types';
import {pokemonApiBaseUrl} from '@/utils/constants';

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
  const {url} = params;

  const response = await axios.get(url);
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
