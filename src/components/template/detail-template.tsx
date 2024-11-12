import {PokemonInfo, EvolutionChain} from '@/components/organism';
import {Footer, Header, LoadingSpinner} from '@/components/atom';
import {EvolutionChainType} from '@/types/evolution-chain';
import {PokemonType} from '@/types/pokemon';

interface DetailTemplateProps {
  pokemon: PokemonType;
  pokemonList: PokemonType[];
  explanation: string;
  evolutionChain: EvolutionChainType;
  isPendingPokemonList: boolean;
  isPendingPokemonDetail: boolean;
}

export default function DetailTemplate(props: DetailTemplateProps) {
  const {
    pokemon,
    pokemonList,
    explanation,
    evolutionChain,
    isPendingPokemonList,
    isPendingPokemonDetail,
  } = props;

  return (
    <div data-testid="detail-template" className="mx-auto flex flex-col h-screen">
      <Header />

      {isPendingPokemonDetail ? (
        <LoadingSpinner />
      ) : (
        <div data-testid="pokemon-basic-info" className="p-6 overflow-auto h-full">
          <div className="overflow-auto max-w-7xl mx-auto">
            <PokemonInfo
              {...{
                pokemon,
                explanation,
                evolutionChain,
              }}
            />

            {evolutionChain && !isPendingPokemonList && (
              <EvolutionChain
                {...{
                  pokemonList,
                  evolutionChain,
                }}
              />
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
