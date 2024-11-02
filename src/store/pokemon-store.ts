import create from 'zustand';

interface PokemonStore {
  totalPages: number;
  setTotalPages: (pages: number) => void;

  pokemonList: any[];
  setPokemonList: (list: any[]) => void;

  pokemonDetailList: any[];
  setPokemonDetailList: (list: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  setTotalPages: (pages) => set({totalPages: pages}),

  pokemonList: [],
  setPokemonList: (list) => set({pokemonList: list}),

  pokemonDetailList: [],
  setPokemonDetailList: (list) => set({pokemonDetailList: list}),
}));
