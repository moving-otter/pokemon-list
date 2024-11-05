'use client';

import {csrClient} from '@/services/react-query';
import {useEffect, useState} from 'react';

export function useQueryErrorDetector() {
  const [commonApiError, setCommonApiError] = useState(null);

  // react-query API 에러 감지
  useEffect(() => {
    // 쿼리 캐시에서 전역 오류 구독 설정
    const unsubscribe = csrClient.getQueryCache().subscribe((event) => {
      const query = event?.query;

      // query가 존재하고, 오류 상태인 경우
      if (query && query.state.error) {
        const error = query.state.error as any;
        setCommonApiError(error.message); // 오류 메시지를 상태에 저장
      }
    });

    return () => {
      unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
    };
  }, []);

  return {
    commonApiError,
  };
}
