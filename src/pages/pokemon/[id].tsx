import React from 'react';
import { useRouter } from 'next/router';
import { usePokemonDetail } from '@/hooks/usePokemonDetail';

const PokemonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: pokemon, isLoading, error } = usePokemonDetail(id as string);

  if (isLoading || pokemon === undefined) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className="mx-auto h-48" />
      <div className="text-lg mt-4">
        <p>Height: {pokemon?.height ?? 1 / 10} m</p>
        <p>Weight: {pokemon?.weight ?? 1 / 10} kg</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Types:</h3>
        <div className="flex flex-wrap">
          {pokemon?.types.map(({ type }) => (
            <span key={type.name} className={`inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded type-${type.name}`}>
              {type.name.charAt(0).toUpperCase() + type.name.slice(1)} {/* Capitalize the first letter */}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonDetailPage;
