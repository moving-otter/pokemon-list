import {EvolutionChainType} from '@/types/evolution-chain';
import {PokemonType} from '@/types/pokemon';

interface EvoluationChainProps {
  pokemonList: PokemonType[];
  evolutionChain: EvolutionChainType;
}

export default function EvolutionChain(props: EvoluationChainProps) {
  const {pokemonList, evolutionChain} = props;

  // console.log('check/evolutionChain', evolutionChain);
  console.log('check/pokemonList', pokemonList);

  return (
    <div data-testid="evolution-chain" className="mx-6 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Evolution Chain</h2>
      {/* Add evolution chain details here */}
    </div>
  );
}
