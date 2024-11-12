'use client';

import {PokemonsUrlListParamsSchema} from '@/services/pokemon/types';
import {useQuery, useQueries} from '@tanstack/react-query';
import {parsedId, validatedId} from '@/utils/helper';
import {PokemonType} from '@/types/pokemon';
import {useMemo} from 'react';

// 사용되는 API 목록) 1. 2. 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';

export function usePokemonDetails(listParams: PokemonsUrlListParamsSchema) {
  const getPokemonList = () => {
    const urlList = listParams as PokemonsUrlListParamsSchema;
    return {
      results: urlList,
    };
  };

  const getIsPending = () => {
    const urlList = listParams as PokemonsUrlListParamsSchema;
    return urlList.length === 0 || !allPokemonByIdQueriesSuccessful;
  };

  // #API 2. 여러개의 pokemon 상세 정보 가져오기
  const getPokemonByIdQueries = useQueries({
    queries:
      getPokemonList().results.map((pokemon) =>
        pokemonQueryService.getById({id: validatedId(parsedId(pokemon.url))})
      ) || [],
  });

  // 2번 useQueries 성공 여부 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);

  // `pokmonByIdsList` 계산을 useMemo로 최적화
  const memoPokemonList = useMemo(() => {
    return getPokemonList()
      ?.results.map((_: any, index: number) => {
        const {data: details, isPending: isPendingDetailList} = getPokemonByIdQueries[index] || {};

        if (isPendingDetailList || details === undefined) {
          return null; // 데이터를 아직 받지 못한 경우 null로 처리
        }

        return <PokemonType>{
          name: (details as PokemonType)?.name,
          id: (details as PokemonType)?.id,
          height: (details as PokemonType)?.height,
          weight: (details as PokemonType)?.weight ?? 0,
          types: (details as PokemonType)?.types,
          imageUrl: (details as PokemonType)?.imageUrl,
        };
      })
      .filter(Boolean); // null 값 제거
  }, [getPokemonByIdQueries]);

  return {
    data: {
      pokemonList: memoPokemonList,
    },
    isPending: getIsPending() ?? true,
  };
}
