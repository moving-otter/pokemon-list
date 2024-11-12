import {usePokemonDetails} from '@/hooks/use-pokemon-details';
import {usePokemonDetail} from '@/hooks/use-pokemon-detail';
import {usePokemonList} from '@/hooks/use-pokemon-list';
import {extractUrls, validatedId} from '@/utils/helper';
import {DetailTemplate} from '@/components/template';
import {useRouter} from 'next/router';

export default function DetailPage() {
  const router = useRouter();
  const {id} = router.query;

  // PokeAPI에서 데이터 가져오기
  const {data: pokemonDetailData, isPending: isPendingPokemonDetail} = usePokemonDetail(
    validatedId(id)
  );
  const {data: pokemonListData, isPending: isPendingPokemonList} = usePokemonDetails(
    extractUrls(pokemonDetailData.evolutionChain)
  );
  const {pokemon, explanation, evolutionChain} = pokemonDetailData;
  const {pokemonList} = pokemonListData;

  return (
    <DetailTemplate
      {...{
        pokemon,
        pokemonList,
        explanation,
        evolutionChain,
        isPendingPokemonList,
        isPendingPokemonDetail,
      }}
    />
  );
}
