'use client';

import {QueryCache, QueryClient, QueryClientConfig} from '@tanstack/react-query';

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 60000, // 60초 동안 캐싱
      throwOnError: (error) => console.error(error) === null,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta?.disableErrorHandle) return;
      console.error(error);
    },
  }),
};

export const csrClient: QueryClient = new QueryClient(queryConfig);
