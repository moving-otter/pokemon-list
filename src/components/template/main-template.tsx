import {PokemonDiscovery, PokemonCardList, CardPagination} from '@/components/organism';
import {usePokemonDiscovery} from '@/hooks/use-pokemon-discovery';
import {PokemonsListParam} from '@/services/pokemon/types';
import {Header, LoadingSpinner} from '@/components/atom';
import {usePokemonStore} from '@/store/pokemon-store';
import {ListParamsType} from '@/types/list-params';
import {useEffect, useMemo, useState} from 'react';
import {RegionMapType} from '@/types/region-map';
import {PokemonType} from '@/types/pokemon';

interface MainTemplateProps {
  regionMap: RegionMapType;
  listParams: PokemonsListParam;
  totalCount: number;
  pokemonList: PokemonType[];
  allPokemonList: PokemonType[];
  isPendingRegionMap: boolean;
  isPendingPokemonList: boolean;
  isPendingAllPokemonList: boolean;

  setListParams: (param: ListParamsType) => void;
}

export default function MainTemplate(props: MainTemplateProps) {
  const {
    listParams,
    isPendingRegionMap,
    isPendingPokemonList,
    isPendingAllPokemonList,
    regionMap: regionMapFromAPI,
    totalCount: totalCountFromAPI,
    pokemonList: pokemonListFromAPI,
    allPokemonList: allPokemonListFromAPI,

    setListParams,
  } = props;
  const [totalPages, setTotalPages] = useState(1);
  const [forceRerender, setForceRerender] = useState(true);
  const setAllPokemonList = usePokemonStore((state) => state.setAllPokemonList);

  // 클라이언트 사이드에서 포켓몬 발견하기 (Search, Sort, Filter)
  const {data: PokemonDiscoveryData, isDiscoveringPokemon} = usePokemonDiscovery(listParams);
  const {pokemonList: pokemonListFromClient, totalCount: totalCountFromClient} =
    PokemonDiscoveryData;

  // 포켓몬을 발견하고 있는 경우 클라이언트 사이드의 Filtered Data를 totalCount, pokemonList에 할당
  const totalCount = isDiscoveringPokemon ? totalCountFromClient : totalCountFromAPI;
  const pokemonList = isDiscoveringPokemon ? pokemonListFromClient : pokemonListFromAPI;
  const disabled = isPendingRegionMap || isPendingAllPokemonList;

  // 페이지네이션에 전달할 전체 페이지 개수 계산
  useEffect(() => {
    if (pokemonListFromAPI) {
      setTotalPages(Math.ceil(totalCountFromAPI / listParams.limit));
    }
    if (isDiscoveringPokemon) {
      setTotalPages(Math.ceil(totalCountFromClient / listParams.limit));
    }
    setForceRerender(false); // 디테일 페이지에서 메인으로 돌아왔을 때 Card List UI 싱크를 맞추기 위한 용도
  }, [pokemonListFromAPI, pokemonListFromClient]);

  // 전체 포켓몬 정보를 PokemonStore에 저장. Search, Sort, Filter에 활용됨
  useEffect(() => {
    if (!isPendingPokemonList) {
      setAllPokemonList(allPokemonListFromAPI);
    }
  }, [isPendingAllPokemonList]);

  return (
    <div data-testid="main-template" className="mx-auto flex flex-col h-screen">
      <Header hasBorder={false} />

      <PokemonDiscovery
        {...{
          disabled,
          regionMap: regionMapFromAPI,
        }}
      />

      {isPendingPokemonList || forceRerender ? (
        <LoadingSpinner />
      ) : (
        <PokemonCardList
          {...{
            disabled,
            pokemonList,
          }}
        />
      )}

      <CardPagination
        {...{
          listParams,
          totalPages,
          totalCount,
          setListParams,
        }}
      />
    </div>
  );
}
