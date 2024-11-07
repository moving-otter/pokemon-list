import '../styles/globals.css';
import 'semantic-ui-css/semantic.min.css';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {csrClient} from '@/services/react-query';
import {useQueryError} from '@/hooks/use-query-error';
import {QueryClientProvider} from '@tanstack/react-query';
import {ErrorBoundary, QueryError} from '@/components/molecule';

const NextHead = Head;

export default function App({Component, pageProps}: AppProps) {
  const {errorMessage} = useQueryError();

  if (errorMessage) {
    return <QueryError {...{errorMessage}} />;
  }

  return (
    <QueryClientProvider client={csrClient}>
      <NextHead>
        <title>Pokedex</title>
        <link rel="icon" href="/favicon/monsterball-312x320.png" />
      </NextHead>

      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </QueryClientProvider>
  );
}
