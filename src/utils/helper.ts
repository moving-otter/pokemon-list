export function parsedId(url: string) {
  const splitted = url?.split('/');
  const id = splitted[splitted.length - 2];

  return id;
}

export function validatedId(id: string | string[] | undefined) {
  return typeof id === 'string' ? id : 'undefined';
}

export function isObjectEmpty(param: object) {
  return Object.keys(param).length === 0;
}
