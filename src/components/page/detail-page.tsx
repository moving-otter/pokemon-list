import {usePokemonDetail} from '@/hooks/use-pokemon-detail';
import {DetailTemplate} from '@/components/template';
import {validatedId} from '@/utils/data-helper';
import {useRouter} from 'next/router';

export default function DetailPage() {
  const router = useRouter();
  const {id} = router.query;

  // PokeAPI에서 데이터 가져오기
  const {data: pokemonDetailData, isPending: isPendingPokemonDetail} = usePokemonDetail(
    validatedId(id)
  );
  const {pokemon, explanation, evolutionChain} = pokemonDetailData;

  return (
    <DetailTemplate
      {...{
        pokemon,
        explanation,
        evolutionChain,
        isPendingPokemonDetail,
      }}
    />
  );
}
