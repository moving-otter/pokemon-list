import React from "react";
import Link from "next/link";

interface PokemonCardProps {
  name: string;
  number: number;
  height: number;
  weight: number;
  types: string[];
  imageUrl: string;
}

export default function PokemonCard(props: PokemonCardProps) {
  const { name, number, height, weight, types, imageUrl } = props;

  return (
    <Link
      href={`/pokemon/${name}`}
      className="
      block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
    >
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold capitalize">{name}</h2>
        <p className="text-gray-600"># {number}</p>
        <div className="mt-2">
          <span className="text-sm font-medium">Height: {height / 10} m</span>
          <br />
          <span className="text-sm font-medium">Weight: {weight / 10} kg</span>
        </div>
        <div className="mt-2">
          <h3 className="text-sm font-medium">Types:</h3>
          <div className="flex flex-wrap">
            {types.map((type) => (
              <span
                key={type}
                className={`inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded type-${type}`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}{" "}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
