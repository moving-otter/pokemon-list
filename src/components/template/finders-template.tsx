import {isObjectEmpty} from '@/utils/helper';
import {FinderFilter, FinderSearch, FinderSort} from '@/components/organism';
import {LoadingSlider} from '../atom';

interface FindersTemplateType {
  disabled: boolean;
  regionPokemonIdsMap: Record<string, number[] | undefined>;
}

export default function FindersTemplate(props: FindersTemplateType) {
  const {disabled, regionPokemonIdsMap} = props;

  if (!isObjectEmpty(regionPokemonIdsMap)) {
    console.log('check/regionPokemonIdsMap:', regionPokemonIdsMap);
  }

  return (
    <div data-testid="finders-template">
      <div
        className={`${
          disabled ? 'opacity-50 pointer-events-none' : ''
        } flex flex-wrap justify-between `}
      >
        <FinderSearch />
        <div className="flex items-center space-x-2 mb-4 md:mt-0">
          <FinderSort />

          <FinderFilter />
        </div>
      </div>

      {disabled && <LoadingSlider />}
    </div>
  );
}
