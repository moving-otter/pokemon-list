import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getParsedId} from '@/utils/helper';
import {LoadingSpinner} from '@/components/atom';
import {CardPagination} from '@/components/organism';
import {usePokemonStore} from '@/store/pokemon-store';
import {PokemonsListParam} from '@/services/pokemon/types';
import {CardsListTemplate} from '@/components/template';
import {useQuery, useQueries} from '@tanstack/react-query';
import {initialListParams, undefinedString} from '@/utils/constants';

// 사용되는 [API] 목록) 1 ~ 2 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';

export default function CardsListContainer() {
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonByIdsList);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);
  const [loading, setLoading] = useState(true);

  // 1. [API] pokemon 목록 가져오기
  const {data: pokemonsList, isPending: isPendingList} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  // 2. [API] 여러개의 pokemon 상세 정보 가져오기
  const getPokemonByIdQueries = useQueries({
    queries:
      pokemonsList?.results.map((pokemon) =>
        pokemonQueryService.getById({id: getParsedId(pokemon.url) ?? undefinedString})
      ) || [],
  });

  // [API] 모든 2. pokemonById 쿼리가 성공했는지 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);

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
    if (allPokemonByIdQueriesSuccessful) {
      const pokemonDetailList = getPokemonByIdQueries
        .map((query) => query.data)
        .filter((data) => data); // 유효한 데이터만 필터링

      setPokemonDetailList(pokemonDetailList);
      setLoading(false);
    }
  }, [getPokemonByIdQueries, setPokemonDetailList, allPokemonByIdQueriesSuccessful]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const pokmonByIdsList = pokemonsList?.results
    .map((pokemon: any, index) => {
      const {data: details, isPending: isPendingDetailList} = getPokemonByIdQueries[index] || {};

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

  const enableCondition = !loading && !isPendingList && allPokemonByIdQueriesSuccessful;

  return (
    <>
      {enableCondition ? (
        <CardsListTemplate pokemonByIdsList={pokmonByIdsList} />
      ) : (
        <LoadingSpinner />
      )}

      <CardPagination
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
