import {PokemonType} from '@/types/pokemon';
import {useRouter} from 'next/router';
import {TypeLabel} from '@/components/atom';

interface PokemonDetailProps {
  pokemon: PokemonType;
  explanation: string;
}

export default function PokemonInfo(props: PokemonDetailProps) {
  const {pokemon, explanation} = props;
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div data-testid="pokemon-info" className="p-6 overflow-auto h-full">
      <div className="overflow-auto max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 text-gray-600 hover:text-gray-800 font-medium text-xl flex items-center"
        >
          <span className="mr-2 text-2xl" style={{userSelect: 'none'}}>
            &lt; Back
          </span>
        </button>

        {/* Pokémon Info */}
        <div className="flex gap-6 mb-8">
          {/* Left: Pokémon Image and Name */}
          <div className="flex-shrink-0">
            {pokemon.imageUrl ? (
              <img
                src={pokemon.imageUrl}
                alt={pokemon.name}
                className="h-56 w-56 object-contain shadow-lg rounded-xl border-4 border-gray-200"
                style={{userSelect: 'none', pointerEvents: 'none'}}
              />
            ) : (
              <div className="flex items-center justify-center  bg-gray-50 text-gray-500 rounded-lg h-56 w-56">
                <span className="mb-4">No image</span>
              </div>
            )}
          </div>
          <div className="flex-grow">
            <h1 className="text-4xl font-extrabold text-gray-800 capitalize mb-4">
              {pokemon.name}
            </h1>

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
      </div>
    </div>
  );
}
