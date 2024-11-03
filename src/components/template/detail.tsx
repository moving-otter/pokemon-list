import React from 'react';
import {TypeLabel} from '@/components/atom';

// import {usePokemonStore} from '@/store/pokemon-store';
// const pokemonDetailList = usePokemonStore((state) => state.pokemonDetailList);

interface Detail {
  pokemon: any;
}

export default function Detail(props: Detail) {
  const {pokemon} = props;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 capitalize">{pokemon.name}</h1>
      <img src={pokemon.imageUrl} alt={pokemon.name} className="mx-auto h-48" />
      <div className="text-lg">
        <p>Height: {pokemon?.height / 10} m</p>
        <p>Weight: {pokemon?.weight / 10} kg</p>
      </div>
      <div className="flex flex-wrap">
        {pokemon?.types.map((type: string) => (
          <TypeLabel type={type} />
        ))}
      </div>
    </div>
  );
}
