import '../styles/globals.css';
import React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {csrClient} from '@/services/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';
import {QueryClientProvider} from '@tanstack/react-query';

export default function MyApp({Component, pageProps}: AppProps) {
  return (
    <QueryClientProvider client={csrClient}>
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />

      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon/monsterball-312x320.png" />
      </Head>

      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
