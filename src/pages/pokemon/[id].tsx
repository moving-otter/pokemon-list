import React from 'react';
import {DetailTemplateApi} from '@/components/template-api';
import {Header} from '@/components/atom';

export default function DetailPage() {
  return (
    <div className="mx-auto flex flex-col h-screen ">
      <Header />

      <DetailTemplateApi />
    </div>
  );
}
