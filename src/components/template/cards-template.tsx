import {Card} from '@/components/organism';
import {IPokemon} from '@/interface/pokemon';
import {useRouter} from 'next/router';
import {CardEmpty} from '@/components/atom';
import {useEffect, useRef} from 'react';

interface CardsTemplateProps {
  pokemonList: IPokemon[];
}

export default function CardsTemplate(props: CardsTemplateProps) {
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
        data-testid="cards-template"
        className="flex-grow overflow-y-auto p-4"
      >
        {hasCard ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
            {pokemonList?.map((pokemon: IPokemon) => (
              <Card {...pokemon} />
            ))}
          </div>
        ) : (
          <CardEmpty />
        )}
      </div>
    </>
  );
}
