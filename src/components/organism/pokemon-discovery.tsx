import {SearchPokemon, SortPokemon, FilterPokemon} from '@/components/molecule';
import {isObjectEmpty} from '@/utils/data-helper';
import {RegionMapType} from '@/types/region-map';
import {LoadingSlider} from '@/components/atom';
import {useState} from 'react';

interface PokemonDiscoveryProps {
  disabled: boolean;
  regionMap: RegionMapType;
}

export default function PokemonDiscovery(props: PokemonDiscoveryProps) {
  const {disabled, regionMap} = props;
  const [refresh, setRefresh] = useState(false);

  // if (!isObjectEmpty(regionMap)) {
  //   console.log('check/regionPokemonIdsMap:', regionMap);
  // }

  return (
    <div data-testid="pokemon-discovery" className="border-b-2 border-gray-200 bg-gray-50 relative">
      <div
        className={`${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } flex flex-wrap justify-between `}
      >
        <SearchPokemon {...{setRefresh}} />
        <div className="flex items-center space-x-2 mb-4 md:mt-0">
          <SortPokemon />

          <FilterPokemon />
        </div>
      </div>

      {disabled && <LoadingSlider />}
    </div>
  );
}
