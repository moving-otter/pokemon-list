'use client';

import {PokemonsListParam} from '@/services/pokemon/types';
import {usePokemonStore} from '@/store/pokemon-store';
import {useFinderStore} from '@/store/finder-store';
import {useEffect} from 'react';

export function useFindPokemon(listParams: PokemonsListParam) {
  const sortOption = useFinderStore((state) => state.sortOption);
  const singleSearch = useFinderStore((state) => state.singleSearch);
  const allPokemonList = usePokemonStore((state) => state.allPokemonByIdsList);
  const pokemonList = useFinderStore((state) => state.pokemonList);
  const setPokemonList = useFinderStore((state) => state.setPokemonList);

  const isSortInUse = sortOption !== 'asc';
  const isSearchInUse = singleSearch.length > 1;

  const getPokemonList = () => {
    const {page, limit} = listParams;
    return pokemonList.slice((page - 1) * limit, page * limit);
  };

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
      setPokemonList(newFilteredPokemonList);
    }
  }, [singleSearch, allPokemonList, setPokemonList]);

  // sortOption에 따라 pokemonList 정렬
  useEffect(() => {
    let sortedList = [];

    if (pokemonList.length > 0 && sortOption === 'asc') {
      sortedList = [...pokemonList];
      sortedList.sort((a, b) => a.number - b.number); // 번호순으로 정렬
    }

    if (isSortInUse) {
      if (pokemonList.length === 0) {
        sortedList = [...allPokemonList];
      } else {
        sortedList = [...pokemonList];
      }

      if (sortOption === 'desc') {
        sortedList.sort((a, b) => b.number - a.number); // 번호 역순으로 정렬
      } else if (sortOption === 'atoz') {
        sortedList.sort((a, b) => a.name.localeCompare(b.name)); // 알파벳 순 정렬
      } else if (sortOption === 'ztoa') {
        sortedList.sort((a, b) => b.name.localeCompare(a.name)); // 알파벳 역순 정렬
      }
    }

    setPokemonList(sortedList);
  }, [sortOption]);

  return {
    isFindingPokemon: isSearchInUse || isSortInUse,
    data: {
      pokemonList: getPokemonList(),
      totalCount: pokemonList.length ?? 0,
    },
  };
}
