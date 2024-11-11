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
  const {data: allPokemonListData, isPending: isPendingAllPokemonList} = usePokemonList({
    page: 1,
    limit: -1,
  });
  const {regionMap} = regionMapData;
  const {pokemonList, totalCount} = pokemonListData;
  const {pokemonList: allPokemonList} = allPokemonListData;

  return (
    <MainTemplate
      {...{
        regionMap,
        listParams,
        totalCount,
        pokemonList,
        allPokemonList,
        isPendingRegionMap,
        isPendingPokemonList,
        isPendingAllPokemonList,

        setListParams,
      }}
    />
  );
}
