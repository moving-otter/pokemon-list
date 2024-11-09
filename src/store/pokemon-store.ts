import {PokemonType} from '@/types/pokemon';
import {create} from 'zustand';

interface PokemonStore {
  allPokemonByIdsList: PokemonType[];

  setAllPokemonByIdsList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemonByIdsList: [],

  setAllPokemonByIdsList: (param) => set({allPokemonByIdsList: param}),
}));
