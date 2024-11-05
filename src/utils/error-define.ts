export function handleApiError(error: unknown) {
  console.error(error);
}

export function transformApiError(error: unknown) {
  console.log('check/error.....');
  console.error(error);
}
