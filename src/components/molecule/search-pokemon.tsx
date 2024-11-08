import {useFinderStore} from '@/store/finder-store';

export default function SearchPokemon() {
  const singleSearch = useFinderStore((state) => state.singleSearch);
  const setSingleSearch = useFinderStore((state) => state.setSingleSearch);

  const handleInputChange = (event: React.ChangeEvent | any) => {
    setSingleSearch(event.target.value);
  };

  const handleClearSearch = () => {
    setSingleSearch('');
  };

  return (
    <div
      data-testid="search-pokemon"
      className="flex items-center mb-2 mx-5 relative"
      style={{width: '380px'}}
    >
      <input
        type="text"
        value={singleSearch}
        onChange={handleInputChange}
        placeholder="Please enter Pokemon number, name or type for search."
        className="w-full px-4 py-1.5 mb-1 border border-gray-300 rounded-md focus:outline-none focus:border-gray-50 placeholder-gray-600 placeholder-opacity-50"
      />
      {/* Show the 'X' button only if singleSearch has any value */}
      {singleSearch && (
        <button
          onClick={handleClearSearch}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
