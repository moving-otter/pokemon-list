import {PokemonType} from '@/types/pokemon';
import {create} from 'zustand';

interface PokemonStore {
  allPokemonList: PokemonType[];

  setAllPokemonList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemonList: [],

  setAllPokemonList: (param) => set({allPokemonList: param}),
}));
