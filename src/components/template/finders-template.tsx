import {LoadingSlider} from '../atom';
import {isObjectEmpty} from '@/utils/helper';
import {FinderFilter, FinderSearch, FinderSort} from '@/components/organism';

interface FindersTemplateType {
  disabled: boolean;
  regionMap: Record<string, number[] | undefined>;
}

export default function FindersTemplate(props: FindersTemplateType) {
  const {disabled, regionMap} = props;

  // if (!isObjectEmpty(regionMap)) {
  //   console.log('check/regionPokemonIdsMap:', regionMap);
  // }

  return (
    <div data-testid="finders-template" className="border-b-2 border-gray-200 bg-gray-50 relative">
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
