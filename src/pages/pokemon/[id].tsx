import React from 'react';
import {Detail} from '@/components/template';
import {Loading} from '@/components/atom';
import {useQuery} from '@tanstack/react-query';
import {useRouter} from 'next/router';
import {pokemonQueryService} from '@/services/pokemon/query';

export default function DetailPage() {
  const router = useRouter();
  const {id} = router.query;
  const validatedId = typeof id === 'string' ? id : 'undefined';

  const {data: pokemon, isPending} = useQuery(
    pokemonQueryService.getById({
      id: validatedId,
    })
  );

  return <>{isPending ? <Loading /> : <Detail pokemon={pokemon} />}</>;
}
