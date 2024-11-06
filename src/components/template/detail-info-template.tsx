import {useRouter} from 'next/router';
import {TypeLabel} from '@/components/atom';

interface DetailInfoTemplateProps {
  pokemon: any;
  explanation: string;
  evolutionChain: any;
}

export default function DetailInfoTemplate(props: DetailInfoTemplateProps) {
  const {pokemon, explanation, evolutionChain} = props;
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  console.log('check/evolutionChain', evolutionChain);

  return (
    <div data-testid="detail-info-template" className="container mx-auto p-6 max-w-4xl">
      <button
        onClick={handleBack}
        className="mb-6 text-gray-600 hover:text-gray-800 font-medium text-xl flex items-center"
      >
        <span className="mr-2">&lt; Back</span>
      </button>

      {/* Pokémon Info */}
      <div className="flex gap-6 mb-8">
        {/* Left: Pokémon Image and Name */}
        <div className="flex-shrink-0">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            className="h-56 w-56 object-contain shadow-lg rounded-xl border-4 border-gray-200"
          />
        </div>
        <div className="flex-grow">
          <h1 className="text-4xl font-extrabold text-gray-800 capitalize mb-4">{pokemon.name}</h1>

          <div className="mb-4 flex gap-4">
            <div className="mb-2">
              <p>
                <span className="font-semibold">Height:</span> {pokemon?.height / 10} m
              </p>
            </div>
            <div className="mb-2">
              <p>
                <span className="font-semibold">Weight:</span> {pokemon?.weight / 10} kg
              </p>
            </div>

            {/* Types */}
            <div className="flex flex-wrap gap-2 mb-4">
              {pokemon?.types.map((type: string, index: number) => (
                <TypeLabel key={index} type={type} />
              ))}
            </div>
          </div>

          {/* Explanation */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-800">{explanation}</p>
          </div>
        </div>
      </div>

      {/* Evolution Chain */}
      {evolutionChain && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Evolution Chain</h2>
          {/* Add evolution chain details here */}
        </div>
      )}
    </div>
  );
}
