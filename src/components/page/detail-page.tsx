import {useRouter} from 'next/router';
import {validatedId} from '@/utils/helper';
import {Footer, Header} from '@/components/atom';
import {LoadingSpinner} from '@/components/atom';
import {usePokemonDetail} from '@/hooks/use-pokemon-detail';
import {DetailInfoTemplate} from '@/components/template';

export default function DetailPage() {
  const router = useRouter();
  const {id} = router.query;

  const {data, isPending} = usePokemonDetail(validatedId(id));
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

      <Footer />
    </div>
  );
}
