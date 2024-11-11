'use client';

import {useQuery, useQueries} from '@tanstack/react-query';
import {isObjectEmpty, parsedId} from '@/utils/helper';
import {undefinedString} from '@/utils/constants';
import {useEffect, useState} from 'react';

// 사용되는 API 목록 1. ~ 3. 단계로 호출됨
import {pokedexQueryService} from '@/services/pokedex/query';
import {regionQueryService} from '@/services/region/query';

export function useRegionMap() {
  // HashMap을 생성하여 지역별 포켓몬 ID 저장
  const [regionPokemonIdsMap, setRegionPokemonIdsMap] = useState<Record<string, number[]>>({});

  // #API 1. 모든 region 목록 가져오기
  const {data: regionsList, isPending: isPendingRegions} = useQuery(regionQueryService.getList());

  // #API 2. 모든 region 상세정보 가져오기
  const regionByIdQueries = useQueries({
    queries:
      regionsList?.results.map((region) =>
        regionQueryService.getById({id: parsedId(region.url) ?? undefinedString})
      ) || [],
  });

  // 복수개의 region에 포함된 pokedexes 정보를 참조하여 pokedexId 목록 생성
  const pokedexIds = regionByIdQueries.flatMap(
    (query) => query.data?.pokedexes.map((pokedex) => parsedId(pokedex.url)) ?? []
  );

  // #API 3. 복수개의 pokedex 목록 가져오기
  const pokedexByIdQueries = useQueries({
    queries: pokedexIds.map((id) => pokedexQueryService.getById({id: id ?? undefinedString})) || [],
  });

  // 2, 3번 useQueries 성공 여부 확인
  const allRegionByIdQueriesSuccessful = regionByIdQueries.every((query) => query.isSuccess);
  const allPokedexByIdQueriesSuccessful = pokedexByIdQueries.every((query) => query.isSuccess);

  // 2, 3번 성공 이후에 regionPokemonIdsMap 세팅
  useEffect(() => {
    if (allPokedexByIdQueriesSuccessful && allRegionByIdQueriesSuccessful) {
      regionByIdQueries.forEach((regionQuery, index) => {
        const regionName = regionsList?.results[index]?.name; // 지역 이름
        const pokemonIds =
          pokedexByIdQueries[index]?.data?.pokemon_entries?.map(
            (entry) => Number(parsedId(entry.pokemon_species.url)) // 문자열을 숫자로 변환
          ) || [];

        // Pokemon IDs 정렬
        const sortedPokemonIds = pokemonIds.sort((a, b) => a - b); // 오름차순 정렬

        if (regionName !== undefined) {
          regionPokemonIdsMap[regionName] = sortedPokemonIds;
          setRegionPokemonIdsMap(regionPokemonIdsMap);
        }
      });
    }
  }, [
    regionsList,
    pokedexByIdQueries,
    allRegionByIdQueriesSuccessful,
    allPokedexByIdQueriesSuccessful,
  ]);

  return {
    data: {
      regionMap: regionPokemonIdsMap,
    },
    isPending:
      isPendingRegions ||
      !allRegionByIdQueriesSuccessful ||
      !allPokedexByIdQueriesSuccessful ||
      isObjectEmpty(regionPokemonIdsMap ?? {}),
  };
}
