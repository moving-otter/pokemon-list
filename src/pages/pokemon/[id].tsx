import React from 'react';
import {useQuery, useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {usePokemonStore} from '@/store/pokemon-store';
import {pokemonQueryService} from '@/services/pokemon/query';

export default function PokemonDetailPage() {
  const queryClient = useQueryClient();
  const pokemonDetailList = usePokemonStore((state) => state.pokemonDetailList);
  const router = useRouter();
  const {id} = router.query;
  const pokemonId = typeof id === 'string' ? id : '';
  const {data: pokemon, isPending: isDetailLoading} = useQuery(
    pokemonQueryService.getById({
      id: pokemonId,
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
        <div className="flex flex-wrap">
          {pokemon?.types.map((type) => (
            <span
              key={type}
              className={`inline-block text-xs font-semibold mr-2 px-2.5 py-0.5 rounded type-${type}`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
