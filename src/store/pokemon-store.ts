import create from 'zustand';

type PokemonStore = {
  selectedPokemonId: number | null;
  setSelectedPokemonId: (id: number) => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  selectedPokemonId: null,
  setSelectedPokemonId: (id) => set({ selectedPokemonId: id }),
}));
