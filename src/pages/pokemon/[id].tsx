import React from 'react';
import {useRouter} from 'next/router';
import {pokemonQueryService} from '@/services/pokemon/query';
import {useQuery} from '@tanstack/react-query';
import {pokemonApiBaseUrl} from '@/utils/constants';

export default function PokemonDetailPage() {
  const router = useRouter();
  const {id} = router.query;
  const {data: pokemon, isPending: isDetailLoading} = useQuery(
    pokemonQueryService.getById({
      url: `${pokemonApiBaseUrl}/pokemon/${id}`,
    })
  );

  if (isDetailLoading || pokemon === undefined) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h1>
      <img src={pokemon.imageUrl} alt={pokemon.name} className="mx-auto h-48" />
      <div className="text-lg mt-4">
        <p>Height: {pokemon?.height / 10} m</p>
        <p>Weight: {pokemon?.weight / 10} kg</p>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-medium">Types:</h3>

        <div className="flex flex-wrap">
          {pokemon?.types.map((type) => (
            <span
              key={type}
              className={`inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded type-${type}`}
            >
              {/* Capitalize the first letter */}
              {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
