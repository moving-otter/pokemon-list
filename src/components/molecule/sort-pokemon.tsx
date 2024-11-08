import {useFinderStore} from '@/store/finder-store';
import {Dropdown} from 'semantic-ui-react';
import {useState} from 'react';

export default function SortPokemon() {
  const options = [
    {key: 'lowest-number', text: 'Lowest Number', value: 'asc'},
    {key: 'highest-number', text: 'Highest Number', value: 'desc'},
    {key: 'atoz', text: 'From A to Z', value: 'atoz'},
    {key: 'ztoa', text: 'From Z to A', value: 'ztoa'},
  ];
  const setSortOption = useFinderStore((state) => state.setSortOption);
  const [selectedOption, setSelectedOption] = useState(options[0].value);

  const handleDropdownChange = (_: any, data: any) => {
    setSelectedOption(data.value);
    setSortOption(data.value);
  };

  return (
    <div data-testid="sort-pokemon" className="select-none flex items-center mx-5">
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

      <Dropdown inline options={options} value={selectedOption} onChange={handleDropdownChange} />
    </div>
  );
}
