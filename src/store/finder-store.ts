import {create} from 'zustand';

interface FinderStore {
  sortOption: string;
  searchList: string[];
  singleSearch: string;
  filteredIdsList: number[];

  setSortOption: (param: string) => void;
  setSearchList: (param: string[]) => void;
  setFilteredIdsList: (param: number[]) => void;
  setSingleSearch: (param: string) => void;
}

export const useFinderStore = create<FinderStore>((set) => ({
  sortOption: 'asc', // 'asc' 또는 'desc'
  searchList: [],
  singleSearch: '',
  filteredIdsList: [],

  setSortOption: (param) => set({sortOption: param}),
  setSearchList: (param) => set({searchList: param}),
  setSingleSearch: (param) => set({singleSearch: param}),
  setFilteredIdsList: (param) => set({filteredIdsList: param}),
}));
