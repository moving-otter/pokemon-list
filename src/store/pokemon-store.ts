import {create} from 'zustand';

interface PokemonStore {
  allPokemonByIdsList: any[];

  setAllPokemonByIdsList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  allPokemonByIdsList: [],

  setAllPokemonByIdsList: (param) => set({allPokemonByIdsList: param}),
}));
