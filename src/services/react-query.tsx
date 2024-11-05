'use client';

import {ApiError} from '@/components/molecule';
import {handleApiError, transformApiError} from '@/utils/error-define';
import {QueryCache, QueryClient, MutationCache, QueryClientConfig} from '@tanstack/react-query';

// csr client & default config
export const queryConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      // refetchOnMount: true,

      // Data will be fresh for 60 seconds
      staleTime: 60000,
      // staleTime: 2000,
      // throwOnError: (error) => transformApiError(error) === null,
      throwOnError: (error) => transformApiError(error) === null,
    },
    mutations: {
      throwOnError: (error) => transformApiError(error) === null,
    },
  },
  queryCache: new QueryCache({
    onError(error, query) {
      if (query.meta?.disableErrorHandle) return;
      handleApiError(error);
    },
  }),
  mutationCache: new MutationCache({
    onSettled(_data, _error, _variables, _context, mutation) {
      // https://github.com/TanStack/query/discussions/6045
      // https://tkdodo.eu/blog/automatic-query-invalidation-after-mutations
      if (mutation.meta?.disableInvalidate) return;

      csrClient.invalidateQueries({queryKey: mutation.options.mutationKey});
      if (Array.isArray(mutation.meta?.invalidateKeys)) {
        mutation.meta.invalidateKeys.forEach((key) => csrClient.invalidateQueries({queryKey: key}));
      }
    },

    onError(error, _variables, _context, mutation) {
      if (mutation.meta?.disableErrorHandle) return;
      handleApiError(error);
    },
  }),
};

export const csrClient: QueryClient = new QueryClient(queryConfig);
