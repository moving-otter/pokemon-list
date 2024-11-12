import {zodValidationError} from './constants';
import {undefinedString} from './constants';
import {ZodError} from 'zod';

export const transformApiError = (error: unknown) => {
  if (error instanceof ZodError) {
    console.log('zod error!');
    return zodValidationError;
  }
  // 다른 에러 처리 로직
  return null;
};

export function parsedId(url: string) {
  const splitted = url?.split('/');
  const id = splitted[splitted.length - 2];

  return id;
}

export function validatedId(id: string | string[] | undefined) {
  return typeof id === 'string' ? id : undefinedString;
}

export function isObjectEmpty(param: object) {
  return Object.keys(param).length === 0;
}

export function extractUrls(data: any): {url: string}[] {
  let urls: {url: string}[] = [];

  const traverse = (node: any) => {
    if (node && typeof node === 'object') {
      if (node.url && typeof node.url === 'string') {
        urls.push({url: node.url});
      }

      for (const key in node) {
        if (node.hasOwnProperty(key)) {
          traverse(node[key]);
        }
      }
    }
  };

  traverse(data);

  return urls;
}
