import {RegionMapType} from '@/types/region-map';
import {PokemonType} from '@/types/pokemon';
import {Dropdown} from 'semantic-ui-react';
import {useEffect, useState} from 'react';

interface FilterPokemonProps {
  regionMap: RegionMapType;
  forceInitialize: boolean;
  discoveredPokemonList: PokemonType[];

  setDiscoveredPokemonList: (param: PokemonType[]) => void;
}

export default function FilterPokemon(props: FilterPokemonProps) {
  const {regionMap, forceInitialize, discoveredPokemonList, setDiscoveredPokemonList} = props;
  const options = [
    {key: 'all', text: 'All Regions', value: 'all'},
    ...Object.keys(regionMap).map((regionKey) => ({
      key: regionKey,
      text: regionKey,
      value: regionKey,
    })),
  ];
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  // 검색 키워드가 비어졌을 때 Filter Dropdown 초기화
  useEffect(() => {
    if (forceInitialize) {
      setSelectedOption(options[0].value);
    }
  }, [forceInitialize]);

  // console.log('check/regionMap:', regionMap);

  const handleDropdownChange = (_: any, {value}: {value: string}) => {
    setSelectedOption(value);
  };

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

      <Dropdown
        data-testid="filter-dropdown"
        options={options}
        value={selectedOption}
        onChange={handleDropdownChange}
        inline
      />
    </div>
  );
}
