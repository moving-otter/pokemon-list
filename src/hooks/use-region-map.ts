'use client';

import {parsedId} from '@/utils/data-helper';
import {undefinedString} from '@/utils/constants';
import {usePokemonStore} from '@/store/pokemon-store';
import {useEffect, useState} from 'react';
import {useQuery, useQueries} from '@tanstack/react-query';

// 사용되는 API 목록) 1 ~ 5 단계로 호출됨
import {regionQueryService} from '@/services/region/query';
import {pokemonQueryService} from '@/services/pokemon/query';
import {pokedexQueryService} from '@/services/pokedex/query';

export function useRegionMap() {
  const setAllPokemonByIdsList = usePokemonStore((state) => state.setAllPokemonByIdsList);
  // HashMap을 생성하여 지역별 포켓몬 ID 저장
  const [regionPokemonIdsMap, setRegionPokemonIdsMap] = useState<Record<string, number[]>>({});

  const listParams = {
    page: 1,
    limit: -1,
  };

  // 1. [API] 모든 pokemon 목록 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery({
    ...pokemonQueryService.getList({...listParams}),
  });

  // 2. [API] 복수개의 pokemon 상세정보 가져오기
  const getPokemonByIdQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsedId(pokemon.url)})
      ) || [],
  });

  // 3. [API] 모든 region 목록 가져오기
  const {data: regionsList, isPending: isPendingRegions} = useQuery(regionQueryService.getList());

  // 4. [API] 복수개의 region 상세정보 가져오기
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

  // 5. [API] 복수개의 pokedex 목록 가져오기
  const pokedexByIdQueries = useQueries({
    queries: pokedexIds.map((id) => pokedexQueryService.getById({id: id ?? undefinedString})) || [],
  });

  // 2, 4, 5번 useQueries 성공 여부 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);
  const allRegionByIdQueriesSuccessful = regionByIdQueries.every((query) => query.isSuccess);
  const allPokedexByIdQueriesSuccessful = pokedexByIdQueries.every((query) => query.isSuccess);

  // 2번 성공 이후에 store에 pokemonByIdsList 세팅
  useEffect(() => {
    if (allPokemonByIdQueriesSuccessful) {
      const pokemonByIdsList = getPokemonByIdQueries
        .map((query) => query.data)
        .filter((data) => data); // 유효한 데이터만 필터링

      setAllPokemonByIdsList(pokemonByIdsList);
    }
  }, [allPokemonByIdQueriesSuccessful]);

  // 4, 5번 성공 이후에 regionPokemonIdsMap 세팅
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
    allPokemonByIdQueriesSuccessful,
    allRegionByIdQueriesSuccessful,
    allPokedexByIdQueriesSuccessful,
  ]);

  return {
    data: {
      regionMap: regionPokemonIdsMap,
    },
    isPending:
      isPendingList ||
      isPendingRegions ||
      !allPokemonByIdQueriesSuccessful ||
      !allRegionByIdQueriesSuccessful ||
      !allPokedexByIdQueriesSuccessful,
  };
}
