import React from 'react';
import {useFinderStore} from '@/store/finder-store';
import {RegionFilter, SortOption, SearchInput} from '@/components/molecule';

interface FindersTemplateType {
  enableCondition: boolean;
}

export default function FindersTemplate(props: FindersTemplateType) {
  const {enableCondition} = props;

  const searchList = useFinderStore((state) => state.searchList);

  return (
    <div
      className={`flex flex-wrap px-5 justify-between ${
        enableCondition ? '' : 'opacity-50 pointer-events-none'
      }`}
    >
      <SearchInput />

      <div className="flex items-center space-x-2 mb-4 md:mt-0">
        <SortOption />

        <RegionFilter />
      </div>
    </div>
  );
}
