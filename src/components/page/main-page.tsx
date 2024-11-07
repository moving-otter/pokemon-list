import {IPokemon} from '@/interface/pokemon';
import {useRouter} from 'next/router';
import {useRegionMap} from '@/hooks/use-region-map';
import {usePokemonList} from '@/hooks/use-pokemon-list';
import {useFinderResult} from '@/hooks/use-finder-result';
import {initialListParams} from '@/utils/constants';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useEffect, useState} from 'react';
import {Header, LoadingSpinner} from '@/components/atom';
import {CardsTemplate, FindersTemplate, PaginationTemplate} from '@/components/template';

export default function MainPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listParams, setListParams] = useState<PokemonsListParam>(initialListParams);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const {isUsingFinders, filteredPokemonsList} = useFinderResult();

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

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || 20;

    setCurrentPage(page);
    setListParams({
      page,
      limit,
    });

    if (!router.query.page || !router.query.limit) {
      router.replace({
        pathname: router.pathname,
        query: {...router.query, page, limit},
      });
    }
  }, [router.query.page, router.query.limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const renderCardsTemplate = (list: IPokemon[]) => {
    return (
      <CardsTemplate
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

      <FindersTemplate
        {...{
          disabled: isPendingRegionMap,
          regionMap,
        }}
      />

      {isUsingFinders ? (
        <>{renderCardsTemplate(filteredPokemonsList)}</>
      ) : (
        <>
          {isPendingPokemonList || loading ? (
            <>
              <LoadingSpinner />
            </>
          ) : (
            <>{renderCardsTemplate(pokemonList)}</>
          )}

          <PaginationTemplate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            listParams={listParams}
            setListParams={setListParams}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
