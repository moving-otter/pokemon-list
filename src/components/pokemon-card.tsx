// components/PokemonCard.tsx

import React from 'react';
import Link from 'next/link';

interface PokemonCardProps {
  name: string;
  number: number;
  height: number;
  weight: number;
  types: string[];
  imageUrl: string | null; // Allow imageUrl to be null
}

export default function PokemonCard(props: PokemonCardProps) {
  const {name, number, height, weight, types, imageUrl} = props;

  return (
    <Link
      href={`/pokemon/${number}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 relative flex flex-col" // Make the card a flex container
    >
      <div className="relative w-full aspect-1 overflow-hidden flex-grow p-1">
        {' '}
        {/* Flex-grow to take available space */}
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover" // Keep the aspect ratio while covering the container
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
            <span>No image</span>
          </div>
        )}
      </div>
      <div className="px-3 pb-2">
        {' '}
        {/* Content below the image */}
        <div className="flex">
          <div className="text-gray-600 text-sm font-semibold"># {number}</div>
        </div>
        <div className="flex justify-between">
          <h2 className="text-base font-bold capitalize">{name}</h2>
        </div>
        <div>
          <span className="text-xs font-medium">Height: {height / 10} m</span>
          <br />
          <span className="text-xs font-medium">Weight: {weight / 10} kg</span>
        </div>
        <div className="mt-2 mb-2">
          <div className="flex flex-wrap">
            {types.map((type) => (
              <span
                key={type}
                className={`inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded type-${type}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
