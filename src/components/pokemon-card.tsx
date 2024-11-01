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
      className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200 relative flex flex-col mx-1" // Reduce horizontal margin
    >
      <div className="relative w-full aspect-[3/2] overflow-hidden flex-grow p-1">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-contain transform scale-85" // Further reduced scale to decrease image size
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-100 text-gray-500">
            <span>No image</span>
          </div>
        )}
      </div>
      <div className="px-3 pb-3">
        {' '}
        {/* Reduced padding for the text section */}
        <div className="flex">
          <div className="text-gray-600 text-xs font-semibold"># {number}</div>{' '}
          {/* Smaller font size */}
        </div>
        <div className="flex justify-between">
          <h2 className="text-base font-bold capitalize">{name}</h2> {/* Adjusted font size */}
        </div>
        <div>
          <span className="text-xs font-medium">Height: {height / 10} m</span>
          <br />
          <span className="text-xs font-medium">Weight: {weight / 10} kg</span>
        </div>
        <div className="mt-1 mb-1">
          <div className="flex flex-wrap">
            {types.map((type) => (
              <span
                key={type}
                className={`inline-block text-xs font-semibold mr-1 px-1 py-0.5 rounded type-${type}`} // Smaller padding
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
