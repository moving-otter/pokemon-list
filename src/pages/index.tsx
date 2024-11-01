import React, {useEffect, useState} from 'react';
import Pagination from '@/components/pagination';
import PokemonCard from '@/components/pokemon-card';
import {usePokemonStore} from '@/store/pokemon-store';
import {PokemonListParam} from '@/services/pokemon/types';
import {initialListParams} from '@/utils/constants';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery, useQueries} from '@tanstack/react-query';

export default function PokemonListPage() {
  const setPokemonDetailList = usePokemonStore((state) => state.setPokemonDetailList);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listParams, setListParams] = useState<PokemonListParam>(initialListParams);
  const {data: pokemonList, isPending: isListPending} = useQuery(
    pokemonQueryService.getList({...listParams})
  );

  // 포켓몬 리스트를 통해 세부 정보를 가져옴
  const getPokemonDetailListQueries = useQueries({
    queries:
      pokemonList?.results.map((pokemon) => pokemonQueryService.getById({url: pokemon.url})) || [],
  });

  // 총 페이지 수 설정
  useEffect(() => {
    if (pokemonList) {
      setTotalPages(Math.ceil(pokemonList.count / listParams.limit));
    }
  }, [pokemonList]);

  // 페이지 변경 시 리스트 파라미터 업데이트
  useEffect(() => {
    setListParams({
      page: currentPage,
      limit: 20,
    });
  }, [currentPage]);

  // 모든 세부 정보 쿼리 데이터가 성공적으로 완료되었을 때 zustand에 저장
  useEffect(() => {
    const allQueriesSuccessful = getPokemonDetailListQueries.every((query) => query.isSuccess);
    if (allQueriesSuccessful) {
      const pokemonDetailList = getPokemonDetailListQueries
        .map((query) => query.data)
        .filter((data) => data); // undefined 결과 필터링
      setPokemonDetailList(pokemonDetailList);
    }
  }, [getPokemonDetailListQueries, setPokemonDetailList]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList?.results.map((pokemon: any, index) => {
          const {data: details, isPending: isDetailPending} =
            getPokemonDetailListQueries[index] || {};

          if (isDetailPending || isListPending || details === undefined) {
            return <div key={pokemon.name}>Loading details...</div>;
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
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}
