'use client';

import {csrClient} from '@/services/react-query';
import {useEffect, useState} from 'react';

export function useQueryError() {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const unsubscribe = csrClient.getQueryCache().subscribe((event) => {
      const query = event?.query;

      if (query && query.state.error) {
        const error = query.state.error as any;
        setErrorMessage(error.message);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    errorMessage,
  };
}
