import axios from 'axios';

export function isMockMode() {
  return process.env.MOCK_ENV === 'mock';
}

const pokeApiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2', // 실제 API 기본 URL
  timeout: 10000, // 10초 후에 타임아웃
});

// Mock 데이터 가져오기 함수
async function getMockData(filePath: string) {
  return await import(`@/__mocks__/${filePath}.json`);
}

// 환경에 따른 API 호출 함수, MOCK_ENV 값이 mock인 경우에 mock data 반환
export async function getData(url: string) {
  let data: object;

  // if (isMockMode()) {
  if (process.env.MOCK_ENV === 'mock') {
    const splitted = url?.split('/');
    let path = splitted[1] ?? '';

    if (path.includes('?')) {
      path = path.split('?')[0];
    }
    const mockFilePath = `${path}/${path}${splitted.length === 2 ? '' : '-id'}`;
    await new Promise((resolve) => setTimeout(resolve, 0));

    data = await getMockData(mockFilePath);
  } else {
    const response = await pokeApiClient.get(url);

    data = response.data;
  }

  return data;
}
