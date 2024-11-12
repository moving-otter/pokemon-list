import {PokemonCard} from '@/components/molecule';
import {EmptyPokemon} from '@/components/atom';
import {PokemonType} from '@/types/pokemon';
import {useEffect, useRef} from 'react';
import {useRouter} from 'next/router';
import clsx from 'clsx';

interface PokemonCardListProps {
  disabled: boolean;
  pokemonList: PokemonType[];
}

export default function PokemonCardList(props: PokemonCardListProps) {
  const {disabled, pokemonList} = props;
  const router = useRouter();
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

  useEffect(() => {
    router.events.on('routeChangeStart', saveScrollPosition);
    restoreScrollPosition();
    return () => router.events.off('routeChangeStart', saveScrollPosition);
  }, [router]);

  return (
    <div
      ref={scrollContainerRef}
      data-testid="pokemon-card-list"
      className={clsx('flex-grow overflow-y-auto p-4', {
        'opacity-60 cursor-default pointer-events-none': disabled,
      })}
    >
      {pokemonList.length === 0 ? (
        <EmptyPokemon />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {pokemonList?.map((pokemon: PokemonType) => (
            <div className={clsx({'cursor-default': disabled})} key={pokemon.name}>
              <PokemonCard {...pokemon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
