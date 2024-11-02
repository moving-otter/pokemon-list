// Other imports remain the same
import React, {useEffect, useState} from 'react';
import PokemonCard from '@/components/pokemon-card';
import PokemonHeader from '@/components/pokemon-header';
import PokemonPagination from '@/components/pokemon-pagination';
import {useRouter} from 'next/router';
import {usePokemonStore} from '@/store/pokemon-store';
import {parsePocketmonId} from '@/utils/helper';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function PokemonListPage() {
  const router = useRouter();
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonListParam>(initialListParams);

  const {data: pokemonList, isPending: isListPending} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  useEffect(() => {
    if (pokemonList) {
      setTotalPages(Math.ceil(pokemonList.count / listParams.limit));
    }
  }, [pokemonList]);

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || 20;

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
    const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data);
      setPokemonDetailList(pokemonDetailList);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList]);

  useEffect(() => {
    const handleRouteChange = () => {
      const scrollPosition = window.scrollY;
      sessionStorage.setItem('scrollPosition', JSON.stringify(scrollPosition));
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.events]);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, JSON.parse(scrollPosition));
      sessionStorage.removeItem('scrollPosition');
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const renderPokemonCards = () => {
    return pokemonList?.results.map((pokemon: any, index) => {
      const {data: details, isPending: isDetailPending} = getPokemonDetailListQueries[index] || {};

      if (isDetailPending || details === undefined) {
        return <></>;
      }

      return (
        <PokemonCard
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

  if (isListPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex flex-col h-screen">
      <PokemonHeader />

      

      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
          {renderPokemonCards()}
        </div>
      </div>

      <div className="flex justify-center z-10 py-4 relative bg-gray-50">
        {/* Shadow Effect Above Pagination */}
        <div className="absolute inset-x-0 -top-2 h-2 bg-white shadow-md" />

        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
