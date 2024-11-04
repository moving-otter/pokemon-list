import React, {useEffect, useState, useRef} from 'react';
import {SlideLoading} from '@/components/atom';
import {FindersTemplate} from '@/components/template';
import {parsePocketmonId} from '@/utils/helper';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function FinderContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const hasLoaded = useRef(false); // Track if data has loaded
  const listParams = {
    page: 1,
    limit: -1,
  };

  const {data: pokemonList, isPending: isPendingList} = useQuery({
    ...pokemonQueryService.getList({...listParams}),
  });

  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  useEffect(() => {
    if (!isPendingList && !hasLoaded.current) {
      hasLoaded.current = true; // Set to true after the first successful load
      setIsLoading(true);
    }
    if (allQueriesSuccessful) {
      setIsLoading(false);
    }
  }, [isPendingList, allQueriesSuccessful]);

  return (
    <div className="border-b-2 border-gray-200 bg-gray-50 relative">
      {isLoading || isPendingList || !allQueriesSuccessful ? (
        <div className="bottom-0 w-full pt-12">
          <SlideLoading />
        </div>
      ) : (
        <FindersTemplate />
      )}
    </div>
  );
}
