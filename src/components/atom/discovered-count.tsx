import {PokemonType} from '@/types/pokemon';

interface DiscoveredCountType {
  singleSearch: string;
  discoveredPokemonList: PokemonType[];
}

export default function DiscoveredCount(props: DiscoveredCountType) {
  const {singleSearch, discoveredPokemonList} = props;
  const discoveredCount = discoveredPokemonList.length;
  const isDisplayCount = discoveredCount > 0 && singleSearch.length > 0;

  return (
    <>
      {isDisplayCount && (
        <label className="mb-3 text-lg " style={{marginLeft: '-7px'}}>
          Discovered ( <label className="space-x-2">{discoveredCount}</label> )
        </label>
      )}
    </>
  );
}
