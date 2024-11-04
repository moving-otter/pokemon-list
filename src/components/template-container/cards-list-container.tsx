import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {Pagination} from '@/components/organism';
import {LargeLoading} from '@/components/atom';
import {usePokemonStore} from '@/store/pokemon-store';
import {parsePocketmonId} from '@/utils/helper';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {CardsListTemplate} from '@/components/template';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function CardsListContainer() {
  const router = useRouter();
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonListParam>(initialListParams);
  const [loading, setLoading] = useState(true);

  // 포켓몬 리스트를 가져오기 위한 쿼리
  const {data: pokemonList, isPending: isPendingList} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  // 각 포켓몬의 상세 정보를 가져오기 위한 쿼리
  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: parsePocketmonId(pokemon.url)})
      ) || [],
  });

  // 모든 쿼리가 성공적으로 완료되었는지 확인
  const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);

  // 포켓몬 리스트가 성공적으로 로드되면 총 페이지 수를 계산
  useEffect(() => {
    if (pokemonList) {
      setTotalPages(Math.ceil(pokemonList.count / listParams.limit));
    }
  }, [pokemonList]);

  // 라우터의 쿼리 파라미터에 따라 페이지와 리스트 파라미터를 설정
  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || 20;

    setCurrentPage(page); // 현재 페이지 상태 업데이트
    setListParams({
      page,
      limit,
    });

    // 페이지 번호나 limit이 없는 경우 쿼리 업데이트
    if (!router.query.page || !router.query.limit) {
      router.replace({
        pathname: router.pathname,
        query: {...router.query, page, limit},
      });
    }
  }, [router.query.page, router.query.limit]);

  // 모든 포켓몬 상세 정보를 성공적으로 로드하면 상태 업데이트
  useEffect(() => {
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data); // 유효한 데이터만 필터링

      setPokemonDetailList(pokemonDetailList);
      setLoading(false);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList, allQueriesSuccessful]);

  // Detail 페이지에서 Main 페이지로 돌아올 때 로딩 표시
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

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // 현재 페이지 상태 업데이트
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    }); // 페이지 변경 쿼리 업데이트
  };

  // 통합된 데이터 생성
  const consolidatedData = pokemonList?.results
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
