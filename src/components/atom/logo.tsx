import React from 'react';

export default function Logo() {
  const handleTitleClick = () => {
    window.location.reload();
  };

  return (
    <div className="bg-gray-50 py-2 px-5 flex items-center select-none">
      <img src="/favicon/monsterball-312x320.png" alt="Pokedex Icon" className="w-6 h-6 mr-2" />
      <div
        className="text-xl font-bold cursor-pointer"
        style={{width: 'fit-content'}}
        onClick={handleTitleClick}
      >
        Pokedex
      </div>
    </div>
  );
}
