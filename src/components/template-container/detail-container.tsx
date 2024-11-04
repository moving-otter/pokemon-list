import React, {useEffect, useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {LargeLoading} from '@/components/atom';
import {DetailTemplate} from '@/components/template';

import {pokemonQueryService} from '@/services/pokemon/query';
import {speciesQueryService} from '@/services/species/query';

export default function DetailContainer() {
  const router = useRouter();
  const {id} = router.query;
  const validatedId = typeof id === 'string' ? id : 'undefined';
  const [explanation, setExplanation] = useState('');

  // pokemon 상세정보 가져오기
  const {data: pokemon, isPending: isPendingPokemon} = useQuery(
    pokemonQueryService.getById({
      id: validatedId,
    })
  );

  // species 상세정보 가져오기
  const {data: species, isPending: isPendingSpecies} = useQuery(
    speciesQueryService.getById({
      id: validatedId,
    })
  );

  if (explanation !== '') {
    // console.log('check/explanation', explanation);
  }

  // species에서 가장 긴 영문 설명을 추출
  useEffect(() => {
    if (species !== undefined) {
      const englishFlavorTexts = species.flavor_text_entries.filter(
        (entry) => entry.language.name === 'en'
      );
      const longestFlavorText = englishFlavorTexts.reduce((longest, entry) =>
        entry.flavor_text.length > longest.flavor_text.length ? entry : longest
      );

      setExplanation(longestFlavorText?.flavor_text);
    }
  }, [species]);

  const enableCondition = !isPendingPokemon && !isPendingSpecies;

  return <>{enableCondition ? <DetailTemplate pokemon={pokemon} /> : <LargeLoading />}</>;
}
