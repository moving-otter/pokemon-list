import React from 'react';
import {Card} from '@/components/organism';
import {EmptyItem} from '@/components/molecule';
import {usePokemonStore} from '@/store/pokemon-store';

interface CardsListTemplateProps {
  pokemonByIdsList: any;
}

export default function CardsListTemplate(props: CardsListTemplateProps) {
  const {pokemonByIdsList} = props;

  const cardsListData = pokemonByIdsList;

  const enableCondition = cardsListData?.length !== 0;

  return (
    <div className="flex-grow overflow-y-auto p-4">
      {enableCondition ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {cardsListData?.map((card: any) => (
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
        <EmptyItem />
      )}
    </div>
  );
}
