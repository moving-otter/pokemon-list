import {IPokemon} from '@/types/pokemon';
import {useRouter} from 'next/router';
import {PokemonCard} from '@/components/molecule';
import {EmptyPokemon} from '@/components/atom';
import {useEffect, useRef} from 'react';

interface PokemonCardListProps {
  pokemonList: IPokemon[];
}

export default function PokemonCardList(props: PokemonCardListProps) {
  const {pokemonList} = props;
  const router = useRouter();
  const hasCard = pokemonList?.length !== 0;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const saveScrollPosition = () => {
    if (scrollContainerRef.current) {
      sessionStorage.setItem('scrollPosition', scrollContainerRef.current.scrollTop.toString());
    }
  };

  const restoreScrollPosition = () => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    if (savedPosition && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = parseInt(savedPosition, 10);
    }
  };

  // 디테일에서 메인페이지로 돌아왔을 때 scroll 위치 원복
  useEffect(() => {
    router.events.on('routeChangeStart', saveScrollPosition);
    restoreScrollPosition();

    return () => {
      router.events.off('routeChangeStart', saveScrollPosition);
    };
  }, [router]);

  return (
    <>
      <div
        ref={scrollContainerRef}
        data-testid="pokemon-card-list"
        className="flex-grow overflow-y-auto p-4"
      >
        {hasCard ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {pokemonList?.map((pokemon: IPokemon) => (
              <PokemonCard key={pokemon.name} {...pokemon} />
            ))}
          </div>
        ) : (
          <EmptyPokemon />
        )}
      </div>
    </>
  );
}
