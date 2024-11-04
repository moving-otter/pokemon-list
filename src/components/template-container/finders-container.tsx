import React from 'react';
import {getParsedId} from '@/utils/helper';
import {SlideLoading} from '@/components/atom';
import {FindersTemplate} from '@/components/template';
import {useQuery, useQueries} from '@tanstack/react-query';

import {regionQueryService} from '@/services/region/query';
import {pokemonQueryService} from '@/services/pokemon/query';
import {pokedexQueryService} from '@/services/pokedex/query';

export default function FinderContainer() {
  const listParams = {
    page: 1,
    limit: -1,
  };

  // 전체 포켓몬 목록 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery({
    ...pokemonQueryService.getList({...listParams}),
  });

  const {data: regionsList, isPending: isPendingRegions} = useQuery(regionQueryService.getList());

  // 각 지역별 상세 정보 쿼리
  const regionDetailsQueries = useQueries({
    queries:
      regionsList?.results.map((region) =>
        regionQueryService.getById({id: getParsedId(region.url) ?? 'undefined'})
      ) || [],
  });

  // 모든 `regionById` 쿼리가 성공했는지 확인
  const allRegionQueriesSuccessful = regionDetailsQueries.every((query) => query.isSuccess);

  // 모든 포켓몬 상세 정보 쿼리
  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: getParsedId(pokemon.url) ?? 'undefined'})
      ) || [],
  });

  // 모든 포켓몬 상세 정보 쿼리가 성공했는지 확인
  const allPokemonQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  // 로딩 상태에 따른 UI 렌더링
  return (
    <div className="border-b-2 border-gray-200 bg-gray-50 relative">
      {isPendingList ||
      isPendingRegions ||
      !allRegionQueriesSuccessful ||
      !allPokemonQueriesSuccessful ? (
        <div data-testid="slide-loading-wrapper" className="bottom-0 w-full pt-12">
          <SlideLoading />
        </div>
      ) : (
        <FindersTemplate />
      )}
    </div>
  );
}
