export function parsePocketmonId(url: string) {
  const splitted = url?.split('/');
  const id = splitted[splitted.length - 2];

  return id;
}
