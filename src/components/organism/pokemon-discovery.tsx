import {SearchPokemon, SortPokemon, FilterPokemon} from '@/components/molecule';
import {LoadingSlider, DiscoveredCount} from '@/components/atom';
import {useDiscoveryStore} from '@/store/discovery-store';
import {RegionMapType} from '@/types/region-map';
import {useEffect} from 'react';

interface PokemonDiscoveryProps {
  disabled: boolean;
  regionMap: RegionMapType;
}

export default function PokemonDiscovery(props: PokemonDiscoveryProps) {
  const {disabled, regionMap} = props;
  const singleSearch = useDiscoveryStore((state) => state.singleSearch);
  const discoveredPokemonList = useDiscoveryStore((state) => state.discoveredPokemonList);
  const setSortOption = useDiscoveryStore((state) => state.setSortOption);
  const setSingleSearch = useDiscoveryStore((state) => state.setSingleSearch);
  const setDiscoveredPokemonList = useDiscoveryStore((state) => state.setDiscoveredPokemonList);
  const forceInitialize = singleSearch === '';

  // 검색 키워드가 비어졌을 때 DiscoveryStore 초기화
  useEffect(() => {
    if (forceInitialize) {
      setSortOption('asc'); // sortOption='asc' 값이 초기화 트리거
      setDiscoveredPokemonList([]);
    }
  }, [singleSearch]);

  return (
    <div data-testid="pokemon-discovery" className="border-b-2 border-gray-200 bg-gray-50 relative">
      <div
        className={`${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } flex flex-wrap justify-between `}
      >
        <div className="flex items-center">
          <SearchPokemon
            {...{
              singleSearch,
              setSingleSearch,
              discoveredPokemonList,
            }}
          />

          <DiscoveredCount
            {...{
              singleSearch,
              discoveredPokemonList,
            }}
          />
        </div>

        <div className="flex items-center space-x-2 mb-4 md:mt-0">
          <SortPokemon
            {...{
              setSortOption,
              forceInitialize,
            }}
          />

          <FilterPokemon
            {...{
              regionMap,
              forceInitialize,
            }}
          />
        </div>
      </div>

      {disabled && <LoadingSlider />}
    </div>
  );
}
