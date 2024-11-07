export default function Footer() {
  return (
    <div
      data-testid="footer"
      className="bg-gray-50 px-4 py-5 flex justify-end items-center select-none border-t-2 border-gray-100"
    >
      @developed by referencing the{' '}
      <a href="https://pokeapi.co/" style={{marginLeft: '5px', textDecoration: 'underline'}}>
        PokeAPI
      </a>
    </div>
  );
}
