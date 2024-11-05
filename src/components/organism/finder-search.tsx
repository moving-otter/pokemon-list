import React, {useState} from 'react';
import {useFinderStore} from '@/store/finder-store';

export default function FinderSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const searchList = useFinderStore((state) => state.setSearchList);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log('check/Searching for:', searchTerm);
  };

  return (
    <div
      data-testid="finder-search"
      className="flex items-center mb-2 mr-2"
      style={{width: '380px'}}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        // onKeyPress={handleKeyPress}
        placeholder="Please enter Pokemon number, name or type for search."
        className="w-full px-4 py-1.5 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-50 placeholder-gray-600 placeholder-opacity-50"
      />
    </div>
  );
}
