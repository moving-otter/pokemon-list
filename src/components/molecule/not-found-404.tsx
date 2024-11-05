import Link from 'next/link';
import {Button} from 'semantic-ui-react';
import {Header} from '@/components/atom';

interface NotFoundProps {
  title: string;
  description: string;
}

export default function NotFound404(props: NotFoundProps) {
  const {title, description} = props;

  const handleTitleClick = () => {
    window.location.replace('/');
  };

  return (
    <>
      <Header />

      <div
        className="flex flex-col items-center justify-center h-1/2 border-t-2 border-gray-200 bg-gray-100 text-center pb-40"
        style={{height: 'calc(100vh - 64px)'}}
      >
        <h1 className="text-6xl font-bold text-red-500 ">404</h1>
        <h2 className="mt-4 text-2xl">{title}</h2>
        <p className="mb-7 text-gray-600">{description}</p>

        <Button className="mt-4" onClick={handleTitleClick}>
          Go to Pokedex Home
        </Button>
      </div>
    </>
  );
}
