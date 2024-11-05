import React, {useEffect, useRef} from 'react';
import {Card} from '@/components/organism';
import {CardEmpty} from '@/components/atom';
import {useRouter} from 'next/router';

interface CardsTemplateProps {
  pokemonByIdsList: any;
}

export default function CardsTemplate(props: CardsTemplateProps) {
  const {pokemonByIdsList} = props;
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hasCard = pokemonByIdsList?.length !== 0;

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

  // 디테일에서 메인페이지로 넘어왔을 때 scroll 위치 복원
  useEffect(() => {
    router.events.on('routeChangeStart', saveScrollPosition);

    restoreScrollPosition();

    return () => {
      router.events.off('routeChangeStart', saveScrollPosition);
    };
  }, [router]);

  return (
    <div
      ref={scrollContainerRef}
      data-testid="cards-template"
      className="flex-grow overflow-y-auto p-4"
    >
      {hasCard ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {pokemonByIdsList?.map((card: any) => (
            <Card
              key={card.number}
              name={card.name}
              number={card.number}
              height={card.height}
              weight={card.weight}
              types={card.types}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      ) : (
        <CardEmpty />
      )}
    </div>
  );
}
