'use client';

import {PokemonsListParam} from '@/services/pokemon/types';
import {useDiscoveryStore} from '@/store/discovery-store';
import {usePokemonStore} from '@/store/pokemon-store';
import {useEffect} from 'react';

export function usePokemonDiscovery(listParams: PokemonsListParam) {
  const sortOption = useDiscoveryStore((state) => state.sortOption);
  const singleSearch = useDiscoveryStore((state) => state.singleSearch);
  const allPokemonList = usePokemonStore((state) => state.allPokemonByIdsList);
  const discoveredPokemonList = useDiscoveryStore((state) => state.discoveredPokemonList);
  const setDiscoveredPokemonList = useDiscoveryStore((state) => state.setDiscoveredPokemonList);

  const isSortInUse = sortOption !== 'asc';
  const isSearchInUse = singleSearch.length > 1;

  // singleSearch 값에 따라 allPokemonList 필터링
  useEffect(() => {
    if (isSearchInUse) {
      const newFilteredPokemonList = Object.values(allPokemonList).filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(singleSearch.toLowerCase()) ||
          pokemon.number.toString().includes(singleSearch.toLowerCase()) ||
          pokemon.types.some((type: string) =>
            type.toLowerCase().includes(singleSearch.toLowerCase())
          )
      );
      setDiscoveredPokemonList(newFilteredPokemonList);
    }
  }, [singleSearch, allPokemonList, setDiscoveredPokemonList]);

  // sortOption에 따라 discoveredPokemonList 정렬
  useEffect(() => {
    let sortedList = [];

    if (discoveredPokemonList.length > 0 && sortOption === 'asc') {
      sortedList = [...discoveredPokemonList];
      sortedList.sort((a, b) => a.number - b.number); // 번호순으로 정렬
    }

    if (isSortInUse) {
      if (discoveredPokemonList.length === 0) {
        sortedList = [...allPokemonList];
      } else {
        sortedList = [...discoveredPokemonList];
      }

      if (sortOption === 'desc') {
        sortedList.sort((a, b) => b.number - a.number); // 번호 역순으로 정렬
      } else if (sortOption === 'atoz') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name)); // 알파벳 순 정렬
      } else if (sortOption === 'ztoa') {
        sortedList.sort((a, b) => b.name.localeCompare(a.name)); // 알파벳 역순 정렬
      }
    }

    setDiscoveredPokemonList(sortedList);
  }, [sortOption]);

  const getSlicedList = () => {
    const {page, limit} = listParams;
    return discoveredPokemonList.slice((page - 1) * limit, page * limit);
  };

  return {
    isDiscoveringPokemon: isSearchInUse || isSortInUse,
    data: {
      pokemonList: getSlicedList(),
      totalCount: discoveredPokemonList.length ?? 0,
    },
  };
}
