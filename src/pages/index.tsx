import React, {useEffect, useState, useMemo} from 'react';
import {useRouter} from 'next/router';
import PokemonPagination from '@/components/pokemon-pagination';
import PokemonCard from '@/components/pokemon-card';
import {usePokemonStore} from '@/store/pokemon-store';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';
import {parsePocketmonId} from '@/utils/helper';

export default function PokemonListPage() {
  const router = useRouter(); // Get the router instance
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
    setCurrentPage(page);
    setListParams({
      page,
      limit: 20,
    });
  }, [router.query.page]);

  useEffect(() => {
    const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data);
      setPokemonDetailList(pokemonDetailList);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList]);

  // Save scroll position before navigating away
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

  // Restore scroll position when returning to this page
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem('scrollPosition');
    if (scrollPosition) {
      window.scrollTo(0, JSON.parse(scrollPosition));
      sessionStorage.removeItem('scrollPosition'); // Clear the stored position after restoring
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page},
    });
  };

  // Memoize the PokemonCard components to avoid unnecessary re-renders
  const pokemonCards = useMemo(() => {
    return pokemonList?.results.map((pokemon: any, index) => {
      const {data: details, isPending: isDetailPending} = getPokemonDetailListQueries[index] || {};

      if (isDetailPending || details === undefined) {
        return <></>; // Optionally render a loading state
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
  }, [pokemonList, getPokemonDetailListQueries]); // Dependencies to watch for changes

  if (isListPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonCards}
      </div>

      {/* Center the pagination and add padding */}
      <div className="flex justify-center mt-4 mb-4">
        <PokemonPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
