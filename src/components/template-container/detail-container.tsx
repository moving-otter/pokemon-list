import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {getParsedId} from '@/utils/helper';
import {LargeLoading} from '@/components/atom';
import {DetailTemplate} from '@/components/template';

// 사용되는 [API] 목록
import {pokemonQueryService} from '@/services/pokemon/query';
import {pokemonSpeciesQueryService} from '@/services/pokemon-species/query';
import {evolutionChainQueryService} from '@/services/evolution-chain/query';

export default function DetailContainer() {
  const router = useRouter();
  const {id} = router.query;
  const validatedId = typeof id === 'string' ? id : 'undefined';
  const [explanation, setExplanation] = useState('');

  // [API] pokemon 상세정보 가져오기
  const {data: pokemon, isPending: isPendingPokemon} = useQuery(
    pokemonQueryService.getById({
      id: validatedId,
    })
  );

  // [API] species 상세정보 가져오기
  const {data: pokemonSpecies, isPending: isPendingPokemonSpecies} = useQuery(
    pokemonSpeciesQueryService.getById({
      id: validatedId,
    })
  );

  // [API] evoluation chain 상세정보 가져오기
  const {data: evolutionChain, isPending: isPendingEvolutionChain} = useQuery(
    evolutionChainQueryService.getById({
      id: getParsedId(pokemonSpecies?.evolution_chain?.url ?? 'undefined') ?? 'undefined',
    })
  );

  if (explanation !== '') {
    // console.log('check/explanation', explanation);
  }

  if (evolutionChain !== undefined) {
    // console.log('check/evolutionChain', evolutionChain);
  }

  // species에서 가장 긴 영문 설명을 추출
  useEffect(() => {
    if (pokemonSpecies !== undefined) {
      const englishFlavorTexts = pokemonSpecies.flavor_text_entries.filter(
        (entry) => entry.language.name === 'en'
      );
      const longestFlavorText = englishFlavorTexts.reduce((longest, entry) =>
        entry.flavor_text.length > longest.flavor_text.length ? entry : longest
      );

      setExplanation(longestFlavorText?.flavor_text);
    }
  }, [pokemonSpecies]);

  const enableCondition = !isPendingPokemon && !isPendingPokemonSpecies && !isPendingEvolutionChain;

  return <>{enableCondition ? <DetailTemplate pokemon={pokemon} /> : <LargeLoading />}</>;
}
