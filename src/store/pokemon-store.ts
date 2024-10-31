import create from "zustand";

interface PokemonStore {
  totalPages: number;
  pokemonList: any[];

  setTotalPages: (pages: number) => void;
  setPokemonList: (list: any[]) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  pokemonList: [],

  setTotalPages: (pages) => set({ totalPages: pages }),
  setPokemonList: (list) => set({ pokemonList: list }),
}));
