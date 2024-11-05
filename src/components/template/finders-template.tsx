import React from 'react';
import {useFinderStore} from '@/store/finder-store';
import {FinderFilter, FinderSearch, FinderSort} from '@/components/molecule';

interface FindersTemplateType {
  disabled: boolean;
}

export default function FindersTemplate(props: FindersTemplateType) {
  const {disabled} = props;

  const searchList = useFinderStore((state) => state.searchList);

  return (
    <div
      data-testid="finders-template"
      className={`flex flex-wrap px-5 justify-between ${
        disabled ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <FinderSearch />

      <div className="flex items-center space-x-2 mb-4 md:mt-0">
        <FinderSort />

        <FinderFilter />
      </div>
    </div>
  );
}
