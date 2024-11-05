import {create} from 'zustand';

interface FindersStore {
  sortOption: string;
  searchList: string[];
  singleSearch: string;
  filteredIdsList: number[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setFilteredIdsList: (param: number[]) => void;
  setSingleSearch: (param: string) => void;
}

export const useFindersStore = create<FindersStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  singleSearch: '',
  filteredIdsList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setSingleSearch: (param) => set({singleSearch: param}),
  setFilteredIdsList: (param) => set({filteredIdsList: param}),
}));
