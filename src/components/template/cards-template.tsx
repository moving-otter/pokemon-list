import React from 'react';
import {Card} from '@/components/organism';
import {CardEmpty} from '@/components/molecule';

interface CardsTemplateProps {
  pokemonByIdsList: any;
}

export default function CardsTemplate(props: CardsTemplateProps) {
  const {pokemonByIdsList} = props;

  const hasCard = pokemonByIdsList?.length !== 0;

  return (
    <div data-testid="cards-template" className="flex-grow overflow-y-auto p-4">
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