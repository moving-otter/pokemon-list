import {create} from 'zustand';

interface FinderStore {
  sortOption: string;
  searchList: string[];
  filteredIdsList: number[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setFilteredIdsList: (param: number[]) => void;
}

export const useFinderStore = create<FinderStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  filteredIdsList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setFilteredIdsList: (param) => set({filteredIdsList: param}),
}));
