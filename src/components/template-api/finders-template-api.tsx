import React, {useEffect} from 'react';
import {getParsedId} from '@/utils/helper';
import {SlideLoading} from '@/components/atom';
import {undefinedString} from '@/utils/constants';
import {FindersTemplate} from '@/components/template';
import {useQuery, useQueries} from '@tanstack/react-query';

// 사용되는 [API] 목록) 1 ~ 5 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';
import {regionQueryService} from '@/services/region/query';
import {pokedexQueryService} from '@/services/pokedex/query';

export default function FindersContainer() {
  const listParams = {
    page: 1,
    limit: -1,
  };

  // 1. [API] 모든 pokemon 목록 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery({
    ...pokemonQueryService.getList({...listParams}),
  });

  // 2. [API] 여러개의 pokemon 상세 정보 가져오기
  const getPokemonByIdQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: getParsedId(pokemon.url)})
      ) || [],
  });

  // 3. [API] region 목록 가져오기
  const {data: regionsList, isPending: isPendingRegions} = useQuery(regionQueryService.getList());

  // 4. [API] 여러개의 region 상세정보 가져오기
  const regionByIdQueries = useQueries({
    queries:
      regionsList?.results.map((region) =>
        regionQueryService.getById({id: getParsedId(region.url) ?? undefinedString})
      ) || [],
  });

  // 여러개의 region의 pokedexes 정보를 참조하여 pokedexId 목록 생성
  const pokedexIds = regionByIdQueries.flatMap(
    (query) => query.data?.pokedexes.map((pokedex) => getParsedId(pokedex.url)) ?? []
  );

  // 5. [API] 여러개의 pokedex 목록을 가져오는 쿼리 실행
  const pokedexByIdQueries = useQueries({
    queries: pokedexIds.map((id) => pokedexQueryService.getById({id: id ?? undefinedString})) || [],
  });

  // 모든 `regionById` 쿼리가 성공했는지 확인
  const allRegionByIdQueriesSuccessful = regionByIdQueries.every((query) => query.isSuccess);
  // 모든 `pokedexById` 쿼리가 성공했는지 확인
  const allPokedexByIdQueriesSuccessful = pokedexByIdQueries.every((query) => query.isSuccess);
  // 모든 `pokemonById` 쿼리가 성공했는지 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);

  // HashMap을 생성하여 지역별 포켓몬 ID 저장
  const regionPokemonIdsMap: Record<string, number[] | undefined> = {};

  useEffect(() => {
    if (allPokedexByIdQueriesSuccessful && allRegionByIdQueriesSuccessful) {
      regionByIdQueries.forEach((regionQuery, index) => {
        const regionName = regionsList?.results[index]?.name; // 지역 이름
        const pokemonIds =
          pokedexByIdQueries[index]?.data?.pokemon_entries?.map(
            (entry) => Number(getParsedId(entry.pokemon_species.url)) // 문자열을 숫자로 변환
          ) || [];

        // Pokemon IDs 정렬
        const sortedPokemonIds = pokemonIds.sort((a, b) => a - b); // 오름차순 정렬

        if (regionName !== undefined) {
          regionPokemonIdsMap[regionName] = sortedPokemonIds;
        }
      });

      // console.log('check/regionPokemonIdsMap:', regionPokemonIdsMap);
    }
  }, [
    allPokedexByIdQueriesSuccessful,
    allRegionByIdQueriesSuccessful,
    pokedexByIdQueries,
    regionsList,
  ]);

  const enableCondition =
    !isPendingList &&
    !isPendingRegions &&
    allRegionByIdQueriesSuccessful &&
    allPokedexByIdQueriesSuccessful &&
    allPokemonByIdQueriesSuccessful;

  return (
    <div className="border-b-2 border-gray-200 bg-gray-50 relative">
      <FindersTemplate enableCondition={enableCondition} />

      {!enableCondition && <SlideLoading />}
    </div>
  );
}
