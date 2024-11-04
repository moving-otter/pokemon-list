import React from 'react';
import {SlideLoading} from '@/components/atom';
import {FindersTemplate} from '@/components/template';
import {parsePocketmonId} from '@/utils/helper';
import {regionQueryService} from '@/services/region/query';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function FinderContainer() {
  const listParams = {
    page: 1,
    limit: -1,
  };

  // Pokémon 리스트 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery({
    ...pokemonQueryService.getList({...listParams}),
  });

  // Region 정보 가져오기
  const {data: regionsList, isPending: isPendingRegions} = useQuery(regionQueryService.getList());

  if (!isPendingRegions) {
    console.log('check/regionsList', regionsList);
  }

  // Pokémon 상세 정보 쿼리
  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  return (
    <div className="border-b-2 border-gray-200 bg-gray-50 relative">
      {isPendingList || !allQueriesSuccessful ? (
        <div data-testid="slide-loading-wrapper" className="bottom-0 w-full pt-12">
          <SlideLoading />
        </div>
      ) : (
        <FindersTemplate />
      )}
    </div>
  );
}
