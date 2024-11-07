import {create} from 'zustand';

interface FinderStore {
  sortOption: string;
  searchList: string[];
  singleSearch: string;
  filteredPokemonsList: any[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setFilteredPokemonsList: (param: number[]) => void;
  setSingleSearch: (param: string) => void;
}

export const useFinderStore = create<FinderStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  singleSearch: '',
  filteredPokemonsList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setSingleSearch: (param) => set({singleSearch: param}),
  setFilteredPokemonsList: (param) => set({filteredPokemonsList: param}),
}));
