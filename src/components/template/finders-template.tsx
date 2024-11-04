import React from 'react';
import {MultipleSearch, RegionFilter, SortOption} from '@/components/organism';

interface FindersTemplateType {
  enableCondition: boolean;
}

export default function FindersTemplate({enableCondition}: FindersTemplateType) {
  return (
    <div
      className={`flex flex-wrap py-1 px-5 justify-between ${
        enableCondition ? '' : 'opacity-50 pointer-events-none'
      }`}
    >
      <div className="pb-2 w-full md:min-w-[45%] md:max-w-[60%] lg:min-w-[50%] lg:max-w-[50%]">
        <MultipleSearch />
      </div>

      <div className="flex items-center space-x-2 pb-2 md:mt-0">
        <SortOption />
        <RegionFilter />
      </div>
    </div>
  );
}
