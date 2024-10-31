import React, { useState } from "react";
import Pagination from "@/components/Pagination";
import PokemonCard from "@/components/PokemonCard";
import usePokemonListWithDetails from "@/hooks/usePokemonListWithDetails";
import { usePokemonStore } from "@/store/pokemonStore";

const PokemonListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 20;
  const { pokemonList, isLoading, error } = usePokemonListWithDetails(
    currentPage,
    limit
  );
  const totalPages = usePokemonStore((state) => state.totalPages);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>API Error...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon: any) => (
          <PokemonCard
            key={pokemon.name}
            name={pokemon.name}
            number={pokemon.number}
            height={pokemon.height}
            weight={pokemon.weight}
            types={pokemon.types}
            imageUrl={pokemon.imageUrl}
          />
        ))}
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
