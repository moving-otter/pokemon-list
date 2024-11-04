import React from 'react';
import {RegionFilter, SortOption, SearchInput} from '@/components/organism';

interface FindersTemplateType {
  enableCondition: boolean;
}

export default function FindersTemplate({enableCondition}: FindersTemplateType) {
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
