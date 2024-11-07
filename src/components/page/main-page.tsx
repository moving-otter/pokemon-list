import {IPokemon} from '@/interface/pokemon';
import {useRegionMap} from '@/hooks/use-region-map';
import {usePokemonList} from '@/hooks/use-pokemon-list';
import {useFindPokemon} from '@/hooks/use-find-pokemon';
import {initialListParams} from '@/utils/constants';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useEffect, useState} from 'react';
import {Header, LoadingSpinner} from '@/components/atom';
import {FindPokemon, PokemonCardList, Pagination} from '@/components/template';

export default function MainPage() {
  const [totalPages, setTotalPages] = useState(1);
  const [triggerRerender, setTriggerRerender] = useState(true);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);

  // PokeAPI로부터 가져오는 데이터
  const {data: pokemonListData, isPending: isPendingPokemonList} = usePokemonList(listParams);
  const {data: regionMapData, isPending: isPendingRegionMap} = useRegionMap();
  const {pokemonList, totalCount} = pokemonListData;
  const {regionMap} = regionMapData;

  // 클라이언트 사이드 데이터 필터링 (Search, Sort, Filter)
  const {data: findPokemonData, isFindingPokemon} = useFindPokemon();
  const {filteredPokemonList} = findPokemonData;

  useEffect(() => {
    if (pokemonList) {
      setTriggerRerender(false);
      setTotalPages(Math.ceil(totalCount / listParams.limit));
    }
  }, [pokemonList]);

  const renderCardsTemplate = (pokemonList: IPokemon[]) => {
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
    <div data-testid="main-page" className="mx-auto flex flex-col h-screen">
      <Header hasBorder={false} />

      <FindPokemon
        {...{
          regionMap,
          disabled: isPendingRegionMap,
        }}
      />

      {isFindingPokemon ? (
        <>{renderCardsTemplate(filteredPokemonList)}</>
      ) : (
        <>
          {isPendingPokemonList || triggerRerender ? (
            <LoadingSpinner />
          ) : (
            <>{renderCardsTemplate(pokemonList)}</>
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
