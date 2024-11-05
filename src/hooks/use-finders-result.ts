'use client';

import {useFindersStore} from '@/store/finders-store';
import {usePokemonStore} from '@/store/pokemon-store';
import {useEffect, useState} from 'react';

export function useFindersResult() {
  const singleSearch = useFindersStore((state) => state.singleSearch);
  const pokemonByIdsList = usePokemonStore((state) => state.pokemonByIdsList);
  const filteredIdsList = useFindersStore((state) => state.filteredIdsList);
  const setFilteredIdsList = useFindersStore((state) => state.setFilteredIdsList);
  const [hasFindersOption, setHasFindersOption] = useState(false);

  // singleSearch 값에 따라 pokemonByIdsList 필터링
  useEffect(() => {
    if (singleSearch.length > 0) {
      const filteredPokemonByIdsList = Object.values(pokemonByIdsList).filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(singleSearch.toLowerCase()) ||
          pokemon.number.toString() === singleSearch ||
          pokemon.types.some((type: string) => type.toLowerCase() === singleSearch.toLowerCase())
      );
      setFilteredIdsList(filteredPokemonByIdsList);

      setHasFindersOption(true);
    } else {
      setHasFindersOption(false);
    }
  }, [singleSearch]);

  return {hasFindersOption, filteredIdsList};
}
