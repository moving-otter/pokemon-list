import React, {useEffect, useState, useRef} from 'react';
import {Finders} from '@/components/organism';
import {parsePocketmonId} from '@/utils/helper';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';
import {SlideLoading} from '@/components/atom';

export default function Header() {
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

  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-gray-50 py-2 px-5 flex items-center select-none">
        <img src="/favicon/monsterball-312x320.png" alt="Pokedex Icon" className="w-6 h-6 mr-2" />
        <div
          className="text-xl font-bold cursor-pointer"
          style={{width: 'fit-content'}}
          onClick={handleTitleClick}
        >
          Pokedex
        </div>
      </div>

      <div className="border-b-2 border-gray-200 bg-gray-50 relative" style={{minHeight: '50px'}}>
        {isLoading || isPendingList || !allQueriesSuccessful ? (
          <div className="absolute bottom-0 w-full">
            <SlideLoading />
          </div>
        ) : (
          <Finders />
        )}
      </div>
    </>
  );
}
