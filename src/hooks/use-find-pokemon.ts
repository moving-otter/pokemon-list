'use client';

import {usePokemonStore} from '@/store/pokemon-store';
import {useFinderStore} from '@/store/finder-store';
import {useEffect} from 'react';

export function useFindPokemon() {
  const sortOption = useFinderStore((state) => state.sortOption);
  const singleSearch = useFinderStore((state) => state.singleSearch);
  const allPokemonByIdList = usePokemonStore((state) => state.allPokemonByIdsList);
  const filteredPokemonList = useFinderStore((state) => state.filteredPokemonList);
  const setFilteredPokemonList = useFinderStore((state) => state.setFilteredPokemonList);

  const isSortInUse = sortOption !== 'asc';
  const isSearchInUse = singleSearch.length > 1;

  // singleSearch 값에 따라 allPokemonByIdList 필터링
  useEffect(() => {
    if (isSearchInUse) {
      const newFilteredPokemonByIdList = Object.values(allPokemonByIdList).filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(singleSearch.toLowerCase()) ||
          pokemon.number.toString().includes(singleSearch.toLowerCase()) ||
          pokemon.types.some((type: string) =>
            type.toLowerCase().includes(singleSearch.toLowerCase())
          )
      );
      setFilteredPokemonList(newFilteredPokemonByIdList);
    }
  }, [singleSearch, allPokemonByIdList, setFilteredPokemonList]);

  // sortOption에 따라 filteredPokemonList 정렬
  useEffect(() => {
    if (isSortInUse) {
      let sortedList = [];
      if (filteredPokemonList.length === 0) {
        sortedList = [...allPokemonByIdList];
      } else {
        sortedList = [...filteredPokemonList];
      }

      if (sortOption === 'desc') {
        sortedList.sort((a, b) => b.number - a.number); // 번호 역순 정렬
      } else if (sortOption === 'atoz') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name)); // 알파벳 순 정렬
      } else if (sortOption === 'ztoa') {
        sortedList.sort((a, b) => b.name.localeCompare(a.name)); // 알파벳 역순 정렬
      }

      setFilteredPokemonList(sortedList);
    }
  }, [sortOption]);

  return {
    isFindingPokemon: isSearchInUse || isSortInUse,
    data: {
      filteredPokemonList,
    },
  };
}
