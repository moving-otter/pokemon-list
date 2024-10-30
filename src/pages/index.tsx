import React from 'react';
import Link from 'next/link';
import { usePokemonList } from '../hooks/usePokemonList';

const PokemonListPage = () => {
  const { data: pokemonList, isLoading, error } = usePokemonList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon list.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemonList?.map((pokemon) => (
          <Link href={`/pokemon/${pokemon.name}`} key={pokemon.name}>
            <div className="p-4 bg-white rounded-lg shadow font-semibold text-lg cursor-pointer">
              {pokemon.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PokemonListPage;
