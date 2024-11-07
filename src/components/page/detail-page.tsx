import {useRouter} from 'next/router';
import {validatedId} from '@/utils/data-helper';
import {PokemonDetail} from '@/components/template';
import {Footer, Header} from '@/components/atom';
import {LoadingSpinner} from '@/components/atom';
import {usePokemonDetail} from '@/hooks/use-pokemon-detail';

export default function DetailPage() {
  const router = useRouter();
  const {id} = router.query;

  // PokeAPI에서 데이터 가져오기
  const {data, isPending} = usePokemonDetail(validatedId(id));
  const {pokemon, explanation, evolutionChain} = data;

  return (
    <div data-testid="detail-page" className="mx-auto flex flex-col h-screen">
      <Header />

      {isPending ? (
        <LoadingSpinner />
      ) : (
        <PokemonDetail
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
