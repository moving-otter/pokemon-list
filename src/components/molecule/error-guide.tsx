import {Button} from 'semantic-ui-react';
import {Header} from '@/components/atom';

interface ErrorGuideProps {
  title: string;
  errorCode: string;
  description: string;
}

export default function ErrorGuide(props: ErrorGuideProps) {
  const {title, errorCode, description} = props;

  const handleTitleClick = () => {
    window.location.replace('/');
  };

  return (
    <>
      <Header />

      <div
        data-testid="error-guide"
        className="flex flex-col items-center justify-center h-1/2  bg-gray-100 text-center pb-40"
        style={{height: 'calc(100vh - 64px)'}}
      >
        <h1 className="text-6xl font-bold text-red-500 ">{errorCode}</h1>
        <h2 className="mt-4 text-2xl">{title}</h2>
        <p className="mb-7 text-gray-600">{description}</p>

        <Button className="mt-4" onClick={handleTitleClick}>
          Go to Pokedex Home
        </Button>
      </div>
    </>
  );
}
