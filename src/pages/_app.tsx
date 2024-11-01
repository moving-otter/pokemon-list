import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon/monsterball-312x320.png" />
      </Head>

      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
