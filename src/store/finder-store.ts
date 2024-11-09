import {PokemonType} from '@/types/pokemon';
import {create} from 'zustand';

interface FinderStore {
  sortOption: string;
  searchList: string[];
  singleSearch: string;
  pokemonList: PokemonType[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setSingleSearch: (param: string) => void;
  setPokemonList: (param: PokemonType[]) => void;
}

export const useFinderStore = create<FinderStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  singleSearch: '',
  pokemonList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setSingleSearch: (param) => set({singleSearch: param}),
  setPokemonList: (param) => set({pokemonList: param}),
}));
