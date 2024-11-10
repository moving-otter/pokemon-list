import {PokemonDiscovery, PokemonCardList, CardPagination} from '@/components/organism';
import {usePokemonDiscovery} from '@/hooks/use-pokemon-discovery';
import {Header, LoadingSpinner} from '@/components/atom';
import {ListParamsType} from '@/types/list-params';
import {RegionMapType} from '@/types/region-map';
import {PokemonType} from '@/types/pokemon';
import {useEffect, useState} from 'react';

interface MainTemplateProps {
  regionMap: RegionMapType;
  listParams: any;
  totalCount: number;
  pokemonList: PokemonType[];
  isPendingRegionMap: boolean;
  isPendingPokemonList: boolean;

  setListParams: (param: ListParamsType) => void;
}

export default function MainTemplate(props: MainTemplateProps) {
  const {
    listParams,
    isPendingRegionMap,
    isPendingPokemonList,
    regionMap: regionMapFromAPI,
    totalCount: totalCountFromAPI,
    pokemonList: pokemonListFromAPI,

    setListParams,
  } = props;
  const [totalPages, setTotalPages] = useState(1);
  const [forceRerender, setForceRerender] = useState(true);

  // 클라이언트 사이드에서 포켓몬 발견하기 (Search, Sort, Filter)
  const {data: PokemonDiscoveryData, isDiscoveringPokemon} = usePokemonDiscovery(listParams);
  const {pokemonList: pokemonListFromClient, totalCount: totalCountFromClient} =
    PokemonDiscoveryData;

  // 포켓몬을 발견하고 있는 경우 클라이언트 사이드의 Filtered Data를 totalCount, pokemonList에 할당
  const totalCount = isDiscoveringPokemon ? totalCountFromClient : totalCountFromAPI;
  const pokemonList = isDiscoveringPokemon ? pokemonListFromClient : pokemonListFromAPI;

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

  return (
    <div data-testid="main-template" className="mx-auto flex flex-col h-screen">
      <Header hasBorder={false} />

      <PokemonDiscovery
        {...{
          regionMap: regionMapFromAPI,
          disabled: isPendingRegionMap,
        }}
      />

      {isPendingPokemonList || forceRerender ? (
        <LoadingSpinner />
      ) : (
        <PokemonCardList
          {...{
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
