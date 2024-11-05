import React from 'react';
import {isObjectEmpty} from '@/utils/helper';
import {useFinderStore} from '@/store/finder-store';
import {FinderFilter, FinderSearch, FinderSort} from '@/components/organism';

interface FindersTemplateType {
  disabled: boolean;
  regionPokemonIdsMap: Record<string, number[] | undefined>;
}

export default function FindersTemplate(props: FindersTemplateType) {
  const {disabled, regionPokemonIdsMap} = props;

  const searchList = useFinderStore((state) => state.searchList);

  if (!isObjectEmpty(regionPokemonIdsMap)) {
    console.log('check/regionPokemonIdsMap:', regionPokemonIdsMap);
  }

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
