import {Header} from '@/components/atom';
import {LoadingSpinner} from '@/components/atom';
import {usePokemonDetail} from '@/hooks/use-pokemon-detail';
import {DetailInfoTemplate} from '@/components/template';

export default function DetailPage() {
  const {data, isPending} = usePokemonDetail();
  const {pokemon, explanation, evolutionChain} = data;

  return (
    <div className="mx-auto flex flex-col h-screen ">
      <Header />

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <DetailInfoTemplate
          {...{
            pokemon,
            explanation,
            evolutionChain,
          }}
        />
      )}
    </div>
  );
}
