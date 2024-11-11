import {pokemonsListSchema, pokemonByIdSchema, PokemonByIdParams, PokemonsListParam} from './types';
import {getData} from '@/utils/poke-api-client';

/**
 * @method GET
 * @description 포켓몬의 전체 개수와 간단한 객체 리스트 가져오는 API.
 */
export async function getPokemonsList(params: PokemonsListParam) {
  const {page, limit} = params;
  const data = await getData(`/pokemon?offset=${(page - 1) * limit}&limit=${limit}`);

  return pokemonsListSchema.parse(data);
}

/**
 * @method GET
 * @description 포켓몬의 개별 상세정보를 가져오는 API.
 */
export async function getPokemonById(params: PokemonByIdParams) {
  const {id} = params;
  const data = await getData(`/pokemon/${id}`);
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
