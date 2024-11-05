import create from 'zustand';

interface PokemonStore {
  totalPages: number;
  pokemonByIdsList: any[];

  setTotalPages: (pages: number) => void;
  setPokemonByIdsList: (list: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  pokemonByIdsList: [],

  setTotalPages: (pages) => set({totalPages: pages}),
  setPokemonByIdsList: (list) => set({pokemonByIdsList: list}),
}));
