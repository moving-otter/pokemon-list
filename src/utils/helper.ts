export function getParsedId(url: string) {
  const splitted = url?.split('/');
  const id = splitted[splitted.length - 2];

  return id;
}

export function isObjectEmpty(param: object) {
  return Object.keys(param).length === 0;
}
