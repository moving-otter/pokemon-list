export default function Footer() {
  return (
    <div className="bg-gray-50 p-4 flex justify-end items-center select-none border-t-2 border-gray-200">
      @developed by referencing the{' '}
      <a href="https://pokeapi.co/" style={{marginLeft: '5px', textDecoration: 'underline'}}>
        PokeAPI
      </a>
    </div>
  );
}
