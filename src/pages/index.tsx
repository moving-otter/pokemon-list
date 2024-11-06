import {Header} from '@/components/atom';
import {useMemo} from 'react';
import {CardsTemplate} from '@/components/template';
import {useFindersResult} from '@/hooks/use-finders-result';
import {FindersTemplateApi, CardsListTemplateApi} from '@/components/template-api';

export default function MainPage() {
  const {isUsingFinders, filteredPokemonsList} = useFindersResult();

  const memoHeaderComponent = useMemo(() => <Header hasBorder={false} />, []);
  const memoFindersTemplateComponent = useMemo(() => <FindersTemplateApi />, []);

  return (
    <div className="mx-auto flex flex-col h-screen">
      {memoHeaderComponent}

      {memoFindersTemplateComponent}

      {isUsingFinders ? (
        <CardsTemplate pokemonByIdsList={filteredPokemonsList} />
      ) : (
        <CardsListTemplateApi />
      )}
    </div>
  );
}
