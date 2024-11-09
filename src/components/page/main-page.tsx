import {PokemonsListParam} from '@/services/pokemon/types';
import {usePokemonList} from '@/hooks/use-pokemon-list';
import {useRegionMap} from '@/hooks/use-region-map';
import {initialListParams} from '@/utils/constants';
import {MainTemplate} from '@/components/template';
import {useState} from 'react';

export default function MainPage() {
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);

  // PokeAPI에서 데이터 가져오기
  const {data: regionMapData, isPending: isPendingRegionMap} = useRegionMap();
  const {data: pokemonListData, isPending: isPendingPokemonList} = usePokemonList(listParams);
  const {regionMap} = regionMapData;
  const {pokemonList, totalCount} = pokemonListData;

  return (
    <MainTemplate
      {...{
        regionMap,
        listParams,
        totalCount,
        pokemonList,
        isPendingRegionMap,
        isPendingPokemonList,
        setListParams,
      }}
    />
  );
}
