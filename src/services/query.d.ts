import {Meta} from '@tanstack/react-query';

/**
 * @description insert invalidate key array for query
 */
declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      disableErrorHandle?: boolean;
    };
    mutationMeta: {
      invalidateKeys?: unknown[][];
      disableInvalidate?: boolean;
      disableErrorHandle?: boolean;
    };
  }
}
