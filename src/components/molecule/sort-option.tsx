import React from 'react';
import {Dropdown} from 'semantic-ui-react';

const friendOptions = [
  {
    key: 'Lowest Number',
    text: 'Lowest Number',
    value: 'Lowest Number',
  },
  {
    key: 'Highest Number',
    text: 'Highest Number',
    value: 'Highest Number',
  },
  {
    key: 'A - Z',
    text: 'A - Z',
    value: 'A - Z',
  },
  {
    key: 'Z - A',
    text: 'Z - A',
    value: 'Z - A',
  },
];

export default function SortOption() {
  return (
    <div data-testid="sort-option" className="select-none flex items-center pr-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600 mr-1.5" // 아이콘 크기와 색상 설정
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 9l4-4 4 4M12 5v14M8 15l4 4 4-4" />
      </svg>

      <Dropdown inline options={friendOptions} defaultValue={friendOptions[0].value} />
    </div>
  );
}
