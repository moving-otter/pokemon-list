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
      className="
        flex 
        bg-white 
        rounded-lg 
        shadow-md 
        overflow-hidden 
        transition-transform 
        duration-200 
        ease-in-out 
        transform 
        hover:scale-105 
        hover:bg-blue-50 
        hover:z-10 
        border-transparent 
        relative  
        mx-1
        mb-2  // Added bottom margin for spacing between cards
      "
    >
      <div className="flex flex-col w-full p-2">
        {/* Header with number and name */}
        <div className="flex flex-col items-start">
          <div className="text-gray-600 text-xs font-semibold"># {number}</div>
          <h2 className="text-sm font-bold capitalize break-words">{name}</h2>
        </div>

        <div className="flex">
          {/* Left side: Image */}
          <div className="w-3/5 overflow-hidden">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-30 object-cover" // Set fixed height and cover to prevent overflow
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-gray-50 text-gray-500 rounded-lg">
                <span>No image</span>
              </div>
            )}
          </div>

          {/* Right side: Details */}
          <div className="w-2/5 pl-3 flex flex-col justify-start">
            <div className="text-sm font-medium text-gray-700 mb-1">
              {(height / 10).toFixed(1)}m
            </div>
            <div className="text-sm font-medium text-gray-700 mb-1">
              {(weight / 10).toFixed(1)}kg
            </div>
            <div className="flex flex-col space-y-1">
              {types.map((type) => (
                <div
                  key={type}
                  className={`break-words text-xs font-semibold px-1 py-0.5 rounded type-${type}`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
