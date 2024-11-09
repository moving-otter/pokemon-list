import {EvolutionChainType} from '@/types/evolution-chain';

interface EvoluationChainProps {
  evolutionChain: EvolutionChainType;
}

export default function EvolutionChain(props: EvoluationChainProps) {
  const {evolutionChain} = props;

  console.log('check/evolutionChain', evolutionChain);

  return (
    <div data-testid="evolution-chain" className="mx-6 p-4 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Evolution Chain</h2>
      {/* Add evolution chain details here */}
    </div>
  );
}
