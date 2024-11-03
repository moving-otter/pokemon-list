import React from 'react';
import {MultipleSearch, RegionFilter, SortOption} from '@/components/molecule';

export default function Finders() {
  return (
    <div className="flex flex-wrap px-5 justify-between border-b-2 border-gray-200 bg-gray-50">
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
