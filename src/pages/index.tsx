import React from 'react';
import {Header} from '@/components/atom';
import {FindersContainer, CardsListContainer} from '@/components/template-container';

export default function MainPage() {
  return (
    <div className="mx-auto flex flex-col h-screen">
      <Header />

      <FindersContainer />

      <CardsListContainer />
    </div>
  );
}
