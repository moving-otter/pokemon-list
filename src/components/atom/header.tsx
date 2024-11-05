import React from 'react';

export default function Header() {
  const handleTitleClick = () => {
    window.location.href = '/'; // "/" 경로로 이동
  };

  return (
    <div className="bg-gray-50 py-3 px-5 flex items-center select-none">
      <img
        src="/favicon/monsterball-312x320.png"
        alt="Pokedex Icon"
        className="w-7 h-7 ml-1 mr-3"
      />
      <div
        className="text-2xl font-bold cursor-pointer"
        style={{width: 'fit-content'}}
        onClick={handleTitleClick}
      >
        Pokedex
      </div>
    </div>
  );
}
