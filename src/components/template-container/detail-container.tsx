import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {LargeLoading} from '@/components/atom';
import {DetailTemplate} from '@/components/template';
import {pokemonQueryService} from '@/services/pokemon/query';

export default function DetailContainer() {
  const router = useRouter();
  const {id} = router.query;
  const validatedId = typeof id === 'string' ? id : 'undefined';

  const {data: pokemon, isPending} = useQuery(
    pokemonQueryService.getById({
      id: validatedId,
    })
  );

  return <>{isPending ? <LargeLoading /> : <DetailTemplate pokemon={pokemon} />}</>;
}
