import {PokemonType} from '@/types/pokemon';
import {create} from 'zustand';

interface DiscoveryStore {
  sortOption: string;
  searchList: string[];
  singleSearch: string;
  discoveredPokemonList: PokemonType[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setSingleSearch: (param: string) => void;
  setDiscoveredPokemonList: (param: PokemonType[]) => void;
}

export const useDiscoveryStore = create<DiscoveryStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  singleSearch: '',
  discoveredPokemonList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setSingleSearch: (param) => set({singleSearch: param}),
  setDiscoveredPokemonList: (param) => set({discoveredPokemonList: param}),
}));
