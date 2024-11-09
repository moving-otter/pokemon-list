import {useRouter} from 'next/router';

export function useRouterCore() {
  const router = useRouter();

  const initRouterPage = () => {
    router.push({
      pathname: router.pathname,
      query: {...router.query, page: 1},
    });
  };

  return {initRouterPage};
}
