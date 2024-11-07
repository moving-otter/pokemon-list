import {IPokemon} from '@/interface/pokemon';
import {create} from 'zustand';

interface PokemonStore {
  allPokemonByIdsList: IPokemon[];

  setAllPokemonByIdsList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemonByIdsList: [],

  setAllPokemonByIdsList: (param) => set({allPokemonByIdsList: param}),
}));
