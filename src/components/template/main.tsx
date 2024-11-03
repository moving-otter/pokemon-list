import React from 'react';
import {Header, Finders, CardsList} from '@/components/organism';

export default function Main() {
  return (
    <div className="mx-auto flex flex-col h-screen">
      <Header />

      <CardsList />
    </div>
  );
}
