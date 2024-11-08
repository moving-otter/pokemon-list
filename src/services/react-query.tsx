'use client';

import {transformApiError} from '@/utils/error-helper';
import {zodValidationError} from '@/utils/constants';
import {QueryCache, QueryClient, QueryClientConfig} from '@tanstack/react-query';

export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 0,
      staleTime: 60000, // 60초
      refetchOnWindowFocus: false,
      throwOnError: (error) => transformApiError(error) === zodValidationError,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta?.disableErrorHandle) {
        return;
      }
      console.error(error);
    },
  }),
};

export const csrClient: QueryClient = new QueryClient(queryConfig);
