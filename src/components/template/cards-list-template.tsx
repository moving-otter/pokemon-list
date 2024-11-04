import React from 'react';
import {Card} from '@/components/organism';
import {usePokemonStore} from '@/store/pokemon-store';

interface CardsListTemplateProps {
  consolidatedData: any;
}

export default function CardsListTemplate(props: CardsListTemplateProps) {
  const {consolidatedData} = props;
  const pokemonsList = usePokemonStore((state) => state.pokemonsList);

  console.log('check/pokemonsList', pokemonsList);

  return (
    <div className="flex-grow overflow-y-auto p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
        {consolidatedData?.map((card: any) => (
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
    </div>
  );
}
