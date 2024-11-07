import {Dropdown} from 'semantic-ui-react';

const options = [
  {
    key: 'All Regions',
    text: 'All Regions',
    value: 'All Regions',
  },
  {
    key: 'Region1',
    text: 'Region1',
    value: 'Region1',
  },
  {
    key: 'Region2',
    text: 'Region2',
    value: 'Region2',
  },
  {
    key: 'Region3',
    text: 'Region3',
    value: 'Region3',
  },
];

export default function FinderFilter() {
  return (
    <div data-testid="finder-filter" className="select-none flex items-center pr-4">
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
