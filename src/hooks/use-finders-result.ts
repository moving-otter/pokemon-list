'use client';

import {useFindersStore} from '@/store/finders-store';
import {usePokemonStore} from '@/store/pokemon-store';
import {useEffect, useState} from 'react';

export function useFindersResult() {
  const singleSearch = useFindersStore((state) => state.singleSearch);
  const filteredPokemonsList = useFindersStore((state) => state.filteredPokemonsList);
  const allPokemonByIdsList = usePokemonStore((state) => state.allPokemonByIdsList);

  const setFilteredPokemonsList = useFindersStore((state) => state.setFilteredPokemonsList);
  const [hasFindersOption, setHasFindersOption] = useState(false);

  // singleSearch 값에 따라 pokemonByIdsList 필터링
  useEffect(() => {
    if (singleSearch.length > 0) {
      const newFilteredPokemonByIdsList = Object.values(allPokemonByIdsList).filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(singleSearch.toLowerCase()) ||
          pokemon.number.toString().includes(singleSearch.toLowerCase()) ||
          pokemon.types.some((type: string) =>
            type.toLowerCase().includes(singleSearch.toLowerCase())
          )
      );
      setFilteredPokemonsList(newFilteredPokemonByIdsList);

      setHasFindersOption(true);
    } else {
      setHasFindersOption(false);
    }
  }, [singleSearch]);

  return {hasFindersOption, filteredPokemonsList};
}
