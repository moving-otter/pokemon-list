import React, {useEffect, useState} from 'react';
import {LargeLoading} from '@/components/atom';
import {useRouter} from 'next/router';
import {usePokemonStore} from '@/store/pokemon-store';
import {Card, Pagination} from '@/components/molecule';
import {parsePocketmonId} from '@/utils/helper';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function CardsList() {
  const router = useRouter();
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonListParam>(initialListParams);

  const {data: pokemonList, isPending: isPendingList} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  useEffect(() => {
    if (pokemonList) {
      setTotalPages(Math.ceil(pokemonList.count / listParams.limit));
    }
  }, [pokemonList]);

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || 50;

    setCurrentPage(page);
    setListParams({
      page,
      limit,
    });

    if (!router.query.page || !router.query.limit) {
      router.replace({
        pathname: router.pathname,
        query: {...router.query, page, limit},
      });
    }
  }, [router.query.page, router.query.limit]);

  useEffect(() => {
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data);
      setPokemonDetailList(pokemonDetailList);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const renderCardsList = () => {
    return pokemonList?.results.map((pokemon: any, index) => {
      const {data: details, isPending: isPendingDetailList} =
        getPokemonDetailListQueries[index] || {};

      if (isPendingDetailList || details === undefined) {
        return <></>;
      }

      return (
        <Card
          key={pokemon.name}
          name={details?.name}
          number={details?.number}
          height={details?.height}
          weight={details?.weight}
          types={details?.types}
          imageUrl={details?.imageUrl}
        />
      );
    });
  };

  return (
    <>
      {isPendingList || !allQueriesSuccessful ? (
        <LargeLoading />
      ) : (
        <>
          <div className="flex-grow overflow-y-auto p-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
              {renderCardsList()}
            </div>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            listParams={listParams}
            setListParams={setListParams}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </>
  );
}
