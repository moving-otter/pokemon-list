import React, {useEffect, useState} from 'react';
import PokemonCard from '@/components/pokemon-card';
import PokemonPagination from '@/components/pokemon-pagination';
import {useRouter} from 'next/router';
import {usePokemonStore} from '@/store/pokemon-store';
import {parsePocketmonId} from '@/utils/helper';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';
import {AppBar, TextField, Toolbar, Typography} from '@mui/material';

export default function PokemonListPage() {
  const router = useRouter();
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonListParam>(initialListParams);
  const [searchQuery, setSearchQuery] = useState(''); // Add search state

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

    // Ensure the page and limit parameters are in the URL on initial load
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
    <div className="container mx-auto p-4">
      <AppBar position="fixed" sx={{bgcolor: '#eff6ff'}}>
        <Toolbar className="flex flex-col md:flex-row justify-between items-center">
          <Typography
            variant="h6"
            component="div"
            className="font-bold text-[#36454F] tracking-wider py-1"
          >
            Pokedex
          </Typography>

          <div className="relative w-full max-w-md mt-2 md:mt-0 md:ml-4">
            {' '}
            {/* Added md:ml-4 for horizontal spacing */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Please enter Pokémon number, name or type for searching."
              className="block w-full pl-10 pr-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder:text-gray-400" // Adjusted placeholder color
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"
                  stroke="currentColor"
                />
              </svg>
            </div>
          </div>
        </Toolbar>
      </AppBar>

      {/* Add spacing for the AppBar */}
      <Toolbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
        {renderPokemonCards()}
      </div>

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
