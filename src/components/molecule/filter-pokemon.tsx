import {isObjectEmpty} from '@/utils/data-helper';
import {RegionMapType} from '@/types/region-map';
import {Dropdown} from 'semantic-ui-react';
import {useEffect} from 'react';

interface FilterPokemonProps {
  regionMap: RegionMapType;
  forceInitialize: boolean;
}

export default function FilterPokemon(props: FilterPokemonProps) {
  const {regionMap, forceInitialize} = props;
  const options = [
    {key: '1', text: 'All Regions', value: '1'},
    {key: '2', text: 'Region1', value: '2'},
  ];

  useEffect(() => {
    if (forceInitialize) {
      //
    }
  }, [forceInitialize]);

  if (!isObjectEmpty(regionMap)) {
    // console.log('check/regionPokemonIdsMap:', regionMap);
  }

  return (
    <div data-testid="filter-pokemon" className="select-none flex items-center pr-8">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600 mr-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 4a1 1 0 012 0h10a1 1 0 012 0v2a1 1 0 01-.293.707L13 11.414V15a1 1 0 01-.293.707l-3 3A1 1 0 018 18v-6.586L3.293 6.707A1 1 0 013 6V4z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <Dropdown inline options={options} defaultValue={options[0].value} />
    </div>
  );
}
