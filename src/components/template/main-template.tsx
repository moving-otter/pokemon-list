import {FindPokemon, PokemonCardList, Pagination} from '@/components/organism';
import {Header, LoadingSpinner} from '@/components/atom';
import {useFindPokemon} from '@/hooks/use-find-pokemon';
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

  // 클라이언트 사이드 필터링 (Search, Sort, Filter)
  const {data: findPokemonData, isFindingPokemon} = useFindPokemon(listParams);
  const {pokemonList: pokemonListFromClient, totalCount: totalCountFromClient} = findPokemonData;

  const totalCount = isFindingPokemon ? totalCountFromClient : totalCountFromAPI;
  const pokemonList = isFindingPokemon ? pokemonListFromClient : pokemonListFromAPI;

  // API를 호출한 경우 PokeAPI에서 가져오는 count를 totalCount로 사용
  useEffect(() => {
    if (pokemonListFromAPI) {
      setTotalPages(Math.ceil(totalCountFromAPI / listParams.limit));
    }
  }, [pokemonListFromAPI]);

  // 클라이언트 사이드 필터링인 경우 FilteredList의 전체 개수를 totalCount로 사용
  useEffect(() => {
    if (isFindingPokemon) {
      setTotalPages(Math.ceil(totalCountFromClient / listParams.limit));
    }
  }, [pokemonListFromClient]);

  return (
    <div data-testid="main-template" className="mx-auto flex flex-col h-screen">
      <Header hasBorder={false} />

      <FindPokemon
        {...{
          regionMap: regionMapFromAPI,
          disabled: isPendingRegionMap,
        }}
      />

      {isPendingPokemonList ? (
        <LoadingSpinner />
      ) : (
        <PokemonCardList
          {...{
            pokemonList,
          }}
        />
      )}

      <Pagination
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
