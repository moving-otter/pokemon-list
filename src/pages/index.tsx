import React from 'react';
import {Header} from '@/components/atom';
import {FindersTemplateApi, CardsListTemplateApi} from '@/components/template-api';

export default function MainPage() {
  return (
    <div className="mx-auto flex flex-col h-screen">
      <Header />

      <FindersTemplateApi />

      <CardsListTemplateApi />
    </div>
  );
}
