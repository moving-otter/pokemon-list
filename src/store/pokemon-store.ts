import {Pokemon} from '@/types/pokemon';
import {create} from 'zustand';

interface PokemonStore {
  allPokemonByIdsList: Pokemon[];

  setAllPokemonByIdsList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemonByIdsList: [],

  setAllPokemonByIdsList: (param) => set({allPokemonByIdsList: param}),
}));
