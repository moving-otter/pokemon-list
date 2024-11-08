import {SearchPokemon, SortPokemon, FilterPokemon} from '@/components/molecule';
import {isObjectEmpty} from '@/utils/data-helper';
import {LoadingSlider} from '@/components/atom';
import {IRegionMap} from '@/types/region-map';

interface FindPokemonProps {
  disabled: boolean;
  regionMap: IRegionMap;
}

export default function FindPokemon(props: FindPokemonProps) {
  const {disabled, regionMap} = props;

  // if (!isObjectEmpty(regionMap)) {
  //   console.log('check/regionPokemonIdsMap:', regionMap);
  // }

  return (
    <div data-testid="find-pokemon" className="border-b-2 border-gray-200 bg-gray-50 relative">
      <div
        className={`${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } flex flex-wrap justify-between `}
      >
        <SearchPokemon />
        <div className="flex items-center space-x-2 mb-4 md:mt-0">
          <SortPokemon />

          <FilterPokemon />
        </div>
      </div>

      {disabled && <LoadingSlider />}
    </div>
  );
}
