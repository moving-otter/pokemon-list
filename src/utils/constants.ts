/*
1. staleTime 이전 
- 캐싱된 current data를 가져온다. 

2. staleTime과 cacheTime 사이
- 서버에 new data를 요청한다. 
- 요청 당시에 네트워크 에러가 발생됐을 경우, previous data를 반환한다.   

3. cacheTime 이후
- 서버에 new data를 요청한다. 
- new data를 수신하면 current data가 다시 선정되고 새로운 데이터 관리 주기가 시작된다.  
*/
export const reactQueryOption = {
  staleTime: 30 * 60 * 1000, // 30분
  cacheTime: 60 * 60 * 1000, // 60분
};

export const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2';

export const initialListParams = {
  page: 1,
  limit: 20,
};

export const undefinedString = 'undefined';
