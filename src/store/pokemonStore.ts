import create from 'zustand';

interface PokemonStore {
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  setTotalPages: (pages) => set({ totalPages: pages }),
}));
