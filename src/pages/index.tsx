import React, { useState } from 'react';
import { usePokemonList } from '@/hooks/use-pokemon-list';
import PokemonCard from '@/components/pokemon-card';
import Pagination from '@/components/pagination';

const PokemonListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20; // 페이지당 포켓몬 수
  const { data: pokemonData, isLoading, error } = usePokemonList(currentPage, limit);

  if (isLoading || pokemonData === undefined) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon list.</div>;

  const totalPages = Math.ceil(pokemonData.count / limit);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonData.results.map((pokemon) => {
          const number = pokemon.url.split('/')[6]; // URL에서 포켓몬 넘버 추출
          const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${number}.png`;

          return (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              number={Number(number)}
              height={0} // 초기값, 상세보기에서 가져올 수 있습니다.
              weight={0} // 초기값, 상세보기에서 가져올 수 있습니다.
              types={[]} // 초기값, 상세보기에서 가져올 수 있습니다.
              imageUrl={imageUrl}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PokemonListPage;
