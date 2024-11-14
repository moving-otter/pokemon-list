import {EvolutionChainType, EvolutionDataType} from '@/types/evolution-chain';
import {PokemonType} from '@/types/pokemon';

interface EvolutionChainProps {
  pokemonList: PokemonType[];
  evolutionChain: EvolutionChainType;
}

export default function EvolutionChain(props: EvolutionChainProps) {
  const {pokemonList, evolutionChain} = props;

  const getPokemonData = (name: string) => {
    return pokemonList.find((pokemon) => pokemon.name === name);
  };

  const renderEvolutionChain = (chainNode: EvolutionDataType) => {
    const pokemonData = getPokemonData(chainNode.species.name);
    if (!pokemonData) return null;

    // Render the current Pokémon image and details
    return (
      <div className="flex flex-col items-center">
        <img src={pokemonData.imageUrl} alt={pokemonData.name} className="w-32 h-32 mb-4" />
        <p className="text-lg font-semibold">{pokemonData.name}</p>
        <p className="text-sm text-gray-600">Types: {pokemonData.types.join(', ')}</p>

        {/* If there are evolutions, render them vertically and spaced out */}
        {chainNode.evolves_to.length > 0 && (
          <div className="flex justify-around space-x-12 mt-8">
            {chainNode.evolves_to.map((evolution: EvolutionDataType | any) => (
              <div key={evolution.species.name} className="flex flex-col items-center">
                <span className="text-gray-400 mb-2">→</span>
                {renderEvolutionChain(evolution)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div data-testid="evolution-chain" className="mx-6 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Evolution Chain</h2>
      {/* Render the root evolution chain in a centered horizontal layout */}
      <div className="flex justify-center">{renderEvolutionChain(evolutionChain.chain)}</div>
    </div>
  );
}
