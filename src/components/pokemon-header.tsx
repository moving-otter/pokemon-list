import {AppBar, Toolbar, Typography, Button} from '@mui/material';
import React, {useState} from 'react';
import TestAPIComponent from './test-api-component';

export default function PokemonHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleTitleClick = () => {
    window.location.reload(); // Refresh the page when "Pokedex" is clicked
  };

  return (
    <AppBar position="fixed" sx={{bgcolor: '#f9fafb'}}>
      <Toolbar className="flex flex-col md:flex-row justify-between items-center">
        <h3
          className="font-bold text-[#36454F] tracking-wider py-1 cursor-pointer" // Change cursor to pointer
          onClick={handleTitleClick} // Attach click handler
        >
          Pokedex
        </h3>

        <div className="relative w-full max-w-lg">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Please enter Pokemon number, name or type for searching."
            className="block w-full pl-10 text-md text-gray-700 bg-white border border-gray-300 rounded-md focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out placeholder:text-gray-400"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"
                stroke="currentColor"
              />
            </svg>
          </div>
        </div>

        <TestAPIComponent />
      </Toolbar>
    </AppBar>
  );
}
