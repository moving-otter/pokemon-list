import React, {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {getParsedId} from '@/utils/helper';
import {LoadingSpinner} from '@/components/atom';
import {useFindersResult} from '@/hooks/use-finders-result';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useQuery, useQueries} from '@tanstack/react-query';
import {CardsTemplate, PaginationTemplate} from '@/components/template';
import {initialListParams, undefinedString} from '@/utils/constants';

// 사용되는 [API] 목록) 1 ~ 2 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';

export default function CardsTemplateApi() {
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);
  const [loading, setLoading] = useState(true);
  const {hasFindersOption, filteredIdsList} = useFindersResult();

  console.log('check/hasFindersOption', hasFindersOption);
  console.log('check/filteredIdsList', filteredIdsList);

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

  // 1번 성공 이후에 totalPage 세팅
  useEffect(() => {
    if (pokemonsList) {
      setTotalPages(Math.ceil(pokemonsList.count / listParams.limit));
    }
  }, [pokemonsList]);

  // router 쿼리 세팅
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

  // 2번 useQueries 성공 여부 확인
  const allPokemonByIdQueriesSuccessful = getPokemonByIdQueries.every((query) => query.isSuccess);

  // 2번 성공 이후에 loading 플래그를 true로 변경
  useEffect(() => {
    if (allPokemonByIdQueriesSuccessful) {
      setLoading(false);
    }
  }, [allPokemonByIdQueriesSuccessful]);

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

  const templateRenderingConditions = !loading && !isPendingList && allPokemonByIdQueriesSuccessful;

  return (
    <>
      {templateRenderingConditions ? (
        <CardsTemplate pokemonByIdsList={pokmonByIdsList} />
      ) : (
        <LoadingSpinner />
      )}

      <PaginationTemplate
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
