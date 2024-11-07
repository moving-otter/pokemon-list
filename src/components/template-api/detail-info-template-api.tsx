import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {getParsedId} from '@/utils/helper';
import {LoadingSpinner} from '@/components/atom';
import {undefinedString} from '@/utils/constants';
import {DetailInfoTemplate} from '@/components/template';
import {useEffect, useState, useMemo} from 'react';

// 사용되는 API 목록) 1 ~ 3 단계로 호출됨
import {pokemonQueryService} from '@/services/pokemon/query';
import {pokemonSpeciesQueryService} from '@/services/pokemon-species/query';
import {evolutionChainQueryService} from '@/services/evolution-chain/query';

export default function DetailInfoTemplateApi() {
  const router = useRouter();
  const {id} = router.query;
  const [explanation, setExplanation] = useState('');
  const validatedId = typeof id === 'string' ? id : undefinedString;

  // 1. [API] 하나의 pokemon 상세정보 가져오기
  const {data: pokemon, isPending: isPendingPokemon} = useQuery(
    pokemonQueryService.getById({
      id: validatedId,
    })
  );

  // 2. [API] 하나의 species 상세정보 가져오기
  const {data: pokemonSpecies, isPending: isPendingPokemonSpecies} = useQuery(
    pokemonSpeciesQueryService.getById({
      id: getParsedId(pokemon?.speciesUrl ?? undefinedString) ?? undefinedString,
    })
  );

  // 3. [API] 하나의 evoluation chain 상세정보 가져오기
  const {data: evolutionChain, isPending: isPendingEvolutionChain} = useQuery(
    evolutionChainQueryService.getById({
      id: getParsedId(pokemonSpecies?.evolution_chain?.url ?? undefinedString) ?? undefinedString,
    })
  );

  // species에서 가장 긴 영문 설명을 추출
  const explanationMemoized = useMemo(() => {
    if (pokemonSpecies !== undefined) {
      const englishFlavorTexts = pokemonSpecies.flavor_text_entries.filter(
        (entry) => entry.language.name === 'en'
      );
      const longestFlavorText = englishFlavorTexts.reduce((longest, entry) =>
        entry.flavor_text.length > longest.flavor_text.length ? entry : longest
      );

      return longestFlavorText?.flavor_text || '';
    }
    return '';
  }, [pokemonSpecies]);

  useEffect(() => {
    setExplanation(explanationMemoized);
  }, [explanationMemoized]);

  const enableConditions =
    !isPendingPokemon &&
    !isPendingPokemonSpecies &&
    !isPendingEvolutionChain &&
    explanation !== '' &&
    evolutionChain !== undefined;

  return (
    <>
      {enableConditions ? (
        <DetailInfoTemplate
          pokemon={pokemon}
          explanation={explanation}
          evolutionChain={evolutionChain}
        />
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
}
