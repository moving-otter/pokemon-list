import React from 'react';
import {RegionFilter, SortOption, Search} from '@/components/organism';

interface FindersTemplateType {
  enableCondition: boolean;
}

export default function FindersTemplate({enableCondition}: FindersTemplateType) {
  return (
    <div
      className={`flex flex-wrap px-5 pb-2 justify-between ${
        enableCondition ? '' : 'opacity-50 pointer-events-none'
      }`}
    >
      <Search />

      <div className="flex items-center space-x-2 pb-2 md:mt-0">
        <SortOption />
        <RegionFilter />
      </div>
    </div>
  );
}
