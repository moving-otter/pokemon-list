import React, {useState} from 'react';
import {usePokemonStore} from '@/store/pokemon-store';

export default function SearchInput() {
  const pokemonDetailList = usePokemonStore((state) => state.pokemonDetailList);

  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    console.log('check/Searching for:', searchTerm);
  };

  console.log('check/pokemonsList', pokemonDetailList);

  return (
    <div className="flex items-center mb-2 mr-2" style={{width: '400px'}}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        // onKeyPress={handleKeyPress}
        placeholder="Please enter Pokemon number, name or type for searching."
        className="w-full px-4 py-1.5 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-50 placeholder-gray-400 placeholder-opacity-50"
      />
    </div>
  );
}
