import create from "zustand";

interface PokemonStore {
  totalPages: number;
  setTotalPages: (pages: number) => void;

  pokemonList: any[]; // pokemonList 상태 추가
  setPokemonList: (list: any[]) => void; // pokemonList 업데이트 함수 추가
}

export const usePokemonStore = create<PokemonStore>((set) => ({
  totalPages: 0,
  setTotalPages: (pages) => set({ totalPages: pages }),

  pokemonList: [], // 초기 pokemonList 설정
  setPokemonList: (list) => set({ pokemonList: list }), // pokemonList 업데이트 함수 구현
}));
