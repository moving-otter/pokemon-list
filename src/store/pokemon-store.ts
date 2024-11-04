import create from 'zustand';

interface PokemonStore {
  totalPages: number;
  setTotalPages: (pages: number) => void;

  pokemonsList: any[];
  setPokemonsList: (list: any[]) => void;

  pokemonDetailList: any[];
  setPokemonDetailList: (list: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  setTotalPages: (pages) => set({totalPages: pages}),

  pokemonsList: [],
  setPokemonsList: (list) => set({pokemonsList: list}),

  pokemonDetailList: [],
  setPokemonDetailList: (list) => set({pokemonDetailList: list}),
}));
