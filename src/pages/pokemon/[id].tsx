import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePokemonDetail } from '../../hooks/use-pokemon-detail';
import { GetStaticPaths, GetStaticProps } from 'next';
import { QueryClient, dehydrate } from '@tanstack/react-query';

const PokemonDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data: pokemon, isLoading, error } = usePokemonDetail(id as string);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Pokémon details.</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{pokemon?.name}</h1>
      <img src={pokemon?.sprites.front_default} alt={pokemon?.name} className="mx-auto" />
      <div className="text-lg">
        <p>Height: {pokemon?.height}</p>
        <p>Weight: {pokemon?.weight}</p>
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
  const paths = response.data.results.map((pokemon: { name: string }) => ({
    params: { id: pokemon.name },
  }));

  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const queryClient = new QueryClient();
  const id = params?.id as string;

  await queryClient.prefetchQuery(['pokemonDetail', id], async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return response.data;
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 60,
  };
};

export default PokemonDetailPage;
