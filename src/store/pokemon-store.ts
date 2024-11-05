import {create} from 'zustand';

interface PokemonStore {
  pokemonByIdsList: any[];

  setPokemonByIdsList: (param: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  pokemonByIdsList: [],

  setPokemonByIdsList: (param) => set({pokemonByIdsList: param}),
}));
