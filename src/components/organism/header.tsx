import React, {useEffect, useState} from 'react';
import {Finders} from '@/components/organism';
import {usePokemonStore} from '@/store/pokemon-store';
import {parsePocketmonId} from '@/utils/helper';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function Header() {
  const [isLoading, setIsLoading] = useState(true);
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
    if (!isPendingList || allQueriesSuccessful) {
      setIsLoading(false);
    }
  }, [isPendingList, allQueriesSuccessful]);

  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div className="bg-gray-50 py-2 px-5 flex items-center select-none">
        <img
          src="/favicon/monsterball-312x320.png"
          alt="Pokedex Icon"
          className={`w-6 h-6 mr-2 transition-transform duration-500 ${
            isLoading ? 'animate-spin' : 'spin-out'
          }`} // 로딩 상태에 따라 애니메이션 클래스 추가
        />
        <div
          className="text-xl font-bold cursor-pointer"
          style={{width: 'fit-content'}}
          onClick={handleTitleClick}
        >
          Pokedex
        </div>
      </div>

      {!isLoading && <Finders />}
    </>
  );
}
