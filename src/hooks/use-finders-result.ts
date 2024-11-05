'use client';

import {useEffect} from 'react';
import {useFindersStore} from '@/store/finders-store';
import {usePokemonStore} from '@/store/pokemon-store';

export function useFindersResult() {
  const allPokemonByIdsList = usePokemonStore((state) => state.allPokemonByIdsList);
  const sortOption = useFindersStore((state) => state.sortOption);
  const singleSearch = useFindersStore((state) => state.singleSearch);
  const filteredPokemonsList = useFindersStore((state) => state.filteredPokemonsList);
  const setFilteredPokemonsList = useFindersStore((state) => state.setFilteredPokemonsList);

  const isSearchInUse = singleSearch.length > 0;
  const isSortInUse = sortOption !== 'asc';

  // singleSearch 값에 따라 allPokemonByIdsList 필터링
  useEffect(() => {
    if (isSearchInUse) {
      const newFilteredPokemonByIdsList = Object.values(allPokemonByIdsList).filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(singleSearch.toLowerCase()) ||
          pokemon.number.toString().includes(singleSearch.toLowerCase()) ||
          pokemon.types.some((type: string) =>
            type.toLowerCase().includes(singleSearch.toLowerCase())
          )
      );
      setFilteredPokemonsList(newFilteredPokemonByIdsList);
    }
  }, [singleSearch, allPokemonByIdsList, setFilteredPokemonsList]);

  // sortOption에 따라 filteredPokemonsList 정렬
  useEffect(() => {
    if (isSortInUse) {
      let sortedList = [];
      if (filteredPokemonsList.length === 0) {
        sortedList = [...allPokemonByIdsList];
      } else {
        sortedList = [...filteredPokemonsList];
      }

      if (sortOption === 'desc') {
        sortedList.sort((a, b) => b.number - a.number); // 번호 역순 정렬
      } else if (sortOption === 'atoz') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name)); // 알파벳 순 정렬
      } else if (sortOption === 'ztoa') {
        sortedList.sort((a, b) => b.name.localeCompare(a.name)); // 알파벳 역순 정렬
      }

      setFilteredPokemonsList(sortedList);
    }
  }, [sortOption]);

  return {
    isUsingFinders: isSearchInUse || isSortInUse,
    filteredPokemonsList,
  };
}
