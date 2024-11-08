import {zodValidationError} from './constants';
import {ZodError} from 'zod';

export const transformApiError = (error: unknown) => {
  if (error instanceof ZodError) {
    console.log('zod error!');
    return zodValidationError;
  }

  // 다른 에러 처리 로직
  return null;
};
