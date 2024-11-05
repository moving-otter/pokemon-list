import Link from 'next/link';
import {Button} from 'semantic-ui-react';
import {Header} from '../components/atom';

export default function Custom404() {
  return (
    <>
      <Header />

      <div
        className="flex flex-col items-center justify-center h-1/2 border-t-2 border-gray-200 bg-gray-100 text-center"
        style={{height: 'calc(100vh - 64px)'}} // Header의 높이에 따라 조정 필요
      >
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl">Page Not Found</h2>
        <p className="mb-7 text-gray-600">Sorry, the page you are looking for does not exist.</p>

        <Link href="/" passHref>
          <Button className="mt-4">Go to Pokedex Home</Button>
        </Link>
      </div>
    </>
  );
}
