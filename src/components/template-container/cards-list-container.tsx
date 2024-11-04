import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Pagination} from '@/components/organism';
import {LargeLoading} from '@/components/atom';
import {usePokemonStore} from '@/store/pokemon-store';
import {parsePocketmonId} from '@/utils/helper';
import {PokemonsListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {CardsListTemplate} from '@/components/template';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function CardsListContainer() {
  const router = useRouter();
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);
  const [loading, setLoading] = useState(true);

  const {data: pokemonsList, isPending: isPendingList} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  // 모든 쿼리가 성공적으로 완료되었는지 확인
  const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  useEffect(() => {
    if (pokemonsList) {
      setTotalPages(Math.ceil(pokemonsList.count / listParams.limit));
    }
  }, [pokemonsList]);

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
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data); // 유효한 데이터만 필터링

      setPokemonDetailList(pokemonDetailList);
      setLoading(false);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList, allQueriesSuccessful]);

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (url === router.pathname) {
        setLoading(true);
        setTimeout(() => setLoading(false), 100);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const consolidatedData = pokemonsList?.results
    .map((pokemon: any, index) => {
      const {data: details, isPending: isPendingDetailList} =
        getPokemonDetailListQueries[index] || {};

      if (isPendingDetailList || details === undefined) {
        return null; // 데이터를 아직 받지 못한 경우 null로 처리
      }

      return {
        key: pokemon.name,
        name: details?.name,
        number: details?.number,
        height: details?.height,
        weight: details?.weight,
        types: details?.types,
        imageUrl: details?.imageUrl,
      };
    })
    .filter(Boolean); // null 값 제거

  return (
    <>
      {loading || isPendingList || !allQueriesSuccessful ? (
        <LargeLoading />
      ) : (
        <CardsListTemplate consolidatedData={consolidatedData} />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        listParams={listParams}
        setListParams={setListParams}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
