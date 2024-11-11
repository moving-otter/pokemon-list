import {QueryClientProvider} from '@tanstack/react-query';
import {useQueryError} from '@/hooks/use-query-error';
import {ErrorBoundary, QueryError} from 'src/error';
import {csrClient} from '@/services/react-query';
import 'semantic-ui-css/semantic.min.css';
import {AppProps} from 'next/app';
import '../styles/globals.scss';
import Head from 'next/head';

const NextHead = Head;

export default function App({Component, pageProps}: AppProps) {
  const {errorMessage} = useQueryError();

  if (errorMessage) {
    return <QueryError {...{errorMessage}} />;
  }

  if (process.env.MOCK_ENV === 'mock') {
    console.log('check/mock mode!');
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
