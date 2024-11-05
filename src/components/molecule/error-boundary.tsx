import React, {useState, useEffect} from 'react';
import {ErrorGuide} from '@/components/molecule';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const {children} = props;
  const [hasError, setHasError] = useState(false);

  // 에러 핸들링을 위한 effect
  useEffect(() => {
    const handleError = (event: any) => {
      setHasError(true);
      console.error('에러 발생:', event.error);
    };

    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('error', handleError);
    };
  }, []);

  if (hasError) {
    return (
      <ErrorGuide
        data-testid="error-boundary"
        errorCode={'...'}
        title={'Unexpected UI Error'}
        description={'It seems like some component has UI error.'}
      />
    );
  }

  return children;
}
