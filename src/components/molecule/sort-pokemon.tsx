import {useRouterCore} from '@/hooks/use-router-core';
import {Dropdown} from 'semantic-ui-react';
import {useEffect, useState} from 'react';

interface SortPokemonType {
  forceInitialize: boolean;

  setSortOption: (param: string) => void;
}

export default function SortPokemon(props: SortPokemonType) {
  const {forceInitialize, setSortOption} = props;
  const options = [
    {key: 'lowest-number', text: '# Lowest', value: 'asc'},
    {key: 'highest-number', text: '# Highest', value: 'desc'},
    {key: 'atoz', text: 'From A to Z', value: 'atoz'},
    {key: 'ztoa', text: 'From Z to A', value: 'ztoa'},
  ];
  const {initRouterPage} = useRouterCore();
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  // 검색 키워드가 비어졌을 때 Sort Dropdown 초기화
  useEffect(() => {
    if (forceInitialize) {
      setSelectedOption(options[0].value);
    }
  }, [forceInitialize]);

  const handleDropdownChange = (_: any, {value}: {value: string}) => {
    setSelectedOption(value);
    setSortOption(value);
    initRouterPage();
  };

  return (
    <div data-testid="sort-pokemon" className="select-none flex items-center mr-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 mr-1.5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 9l4-4 4 4M12 5v14M8 15l4 4 4-4" />
      </svg>

      <Dropdown
        data-testid="sort-dropdown"
        options={options}
        value={selectedOption}
        onChange={handleDropdownChange}
        inline
      />
    </div>
  );
}
