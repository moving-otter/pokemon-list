import {IPokemon} from '@/interface/pokemon';
import {useRegionMap} from '@/hooks/use-region-map';
import {usePokemonList} from '@/hooks/use-pokemon-list';
import {useFinderResult} from '@/hooks/use-finder-result';
import {initialListParams} from '@/utils/constants';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useEffect, useState} from 'react';
import {Header, LoadingSpinner} from '@/components/atom';
import {FindPokemon, PokemonCardList, Pagination} from '@/components/template';

export default function MainPage() {
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);

  const {isUsingFinders, filteredPokemonsList: filteredPokemonList} = useFinderResult();

  // PokeAPI로부터 가져오는 데이터
  const {data: pokemonListData, isPending: isPendingPokemonList} = usePokemonList(listParams);
  const {data: regionMapData, isPending: isPendingRegionMap} = useRegionMap();
  const {pokemonList, totalCount} = pokemonListData;
  const {regionMap} = regionMapData;

  useEffect(() => {
    if (pokemonList) {
      setLoading(false);
      setTotalPages(Math.ceil(totalCount / listParams.limit));
    }
  }, [pokemonList]);

  const renderCardsTemplate = (list: IPokemon[]) => {
    return (
      <PokemonCardList
        {...{
          pokemonList: list,
          listParams,
          setListParams,
          totalCount,
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

      {isUsingFinders ? (
        <>{renderCardsTemplate(filteredPokemonList)}</>
      ) : (
        <>
          {isPendingPokemonList || loading ? (
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
            }}
          />
        </>
      )}
    </div>
  );
}
