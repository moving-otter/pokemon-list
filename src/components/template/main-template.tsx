import {FindPokemon, PokemonCardList, Pagination} from '@/components/organism';
import {Header, LoadingSpinner} from '@/components/atom';
import {useFindPokemon} from '@/hooks/use-find-pokemon';
import {IListParams} from '@/types/list-params';
import {IRegionMap} from '@/types/region-map';
import {useEffect, useState} from 'react';
import {IPokemon} from '@/types/pokemon';

interface MainTemplateProps {
  regionMap: IRegionMap;
  listParams: any;
  totalCount: number;
  pokemonList: IPokemon[];
  isPendingRegionMap: boolean;
  isPendingPokemonList: boolean;

  setListParams: (param: IListParams) => void;
}

export default function MainTemplate(props: MainTemplateProps) {
  const {
    regionMap,
    listParams,
    totalCount,
    pokemonList,
    isPendingRegionMap,
    isPendingPokemonList,
    setListParams,
  } = props;
  const [totalPages, setTotalPages] = useState(1);
  const [triggerRerender, setTriggerRerender] = useState(true);

  // 클라이언트 사이드 데이터 필터링 (Search, Sort, Filter)
  const {data: findPokemonData, isFindingPokemon} = useFindPokemon();
  const {filteredPokemonList} = findPokemonData;

  useEffect(() => {
    if (pokemonList) {
      setTriggerRerender(false);
      setTotalPages(Math.ceil(totalCount / listParams.limit));
    }
  }, [pokemonList]);

  const renderPokemonCardList = (pokemonList: IPokemon[]) => {
    return (
      <PokemonCardList
        {...{
          listParams,
          totalCount,
          pokemonList,
          setListParams,
        }}
      />
    );
  };

  return (
    <div data-testid="main-template" className="mx-auto flex flex-col h-screen">
      <Header hasBorder={false} />

      <FindPokemon
        {...{
          regionMap,
          disabled: isPendingRegionMap,
        }}
      />

      {isFindingPokemon ? (
        <>{renderPokemonCardList(filteredPokemonList)}</>
      ) : (
        <>
          {isPendingPokemonList || triggerRerender ? (
            <LoadingSpinner />
          ) : (
            <>{renderPokemonCardList(pokemonList)}</>
          )}

          <Pagination
            {...{
              totalCount,
              totalPages,
              listParams,
              setListParams,
              triggerRerender,
            }}
          />
        </>
      )}
    </div>
  );
}
