import React from 'react';
import {useFindersStore} from '@/store/finders-store';

export default function FinderSearch() {
  const singleSearch = useFindersStore((state) => state.singleSearch);
  const setSingleSearch = useFindersStore((state) => state.setSingleSearch);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSingleSearch(event.target.value);
  };

  return (
    <div
      data-testid="finder-search"
      className="flex items-center mb-2 mr-2"
      style={{width: '380px'}}
    >
      <input
        type="text"
        value={singleSearch}
        onChange={handleInputChange}
        placeholder="Please enter Pokemon number, name or type for search."
        className="w-full px-4 py-1.5 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-50 placeholder-gray-600 placeholder-opacity-50"
      />
    </div>
  );
}
