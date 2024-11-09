'use client';

import {useMemo} from 'react';
import {Pokemon} from '@/types/pokemon';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useQuery, useQueries} from '@tanstack/react-query';
import {parsedId, validatedId} from '@/utils/data-helper';

// 사용되는 [API] 목록) 1. 2. 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';

export function usePokemonList(listParams: PokemonsListParam) {
  // [API] 1. 여러개의 pokemon 목록 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  // [API] 2. 여러개의 pokemon 상세 정보 가져오기
  const getPokemonByIdQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: validatedId(parsedId(pokemon.url))})
      ) || [],
  });

  // 2번 useQueries 성공 여부 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);

  // `pokmonByIdsList` 계산을 useMemo로 최적화
  const memoPokemonList = useMemo(() => {
    return pokemonsList?.results
      .map((pokemon: any, index: number) => {
        const {data: details, isPending: isPendingDetailList} = getPokemonByIdQueries[index] || {};

        if (isPendingDetailList || details === undefined) {
          return null; // 데이터를 아직 받지 못한 경우 null로 처리
        }

        return <Pokemon>{
          name: details?.name,
          number: details?.number,
          height: details?.height,
          weight: details?.weight,
          types: details?.types,
          imageUrl: details?.imageUrl,
        };
      })
      .filter(Boolean); // null 값 제거
  }, [pokemonsList?.results, getPokemonByIdQueries]);

  return {
    data: {
      pokemonList: memoPokemonList,
      totalCount: pokemonsList?.count ?? 0,
    },
    isPending: isPendingList || !allPokemonByIdQueriesSuccessful,
  };
}
