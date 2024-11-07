import {Button} from 'semantic-ui-react';
import {Header, Footer} from '@/components/atom';

interface ErrorGuideProps {
  title: string;
  description: string;
}

export default function ErrorGuide(props: ErrorGuideProps) {
  const {title, description} = props;

  const handleTitleClick = () => window.location.replace('/');

  return (
    <>
      <Header />

      <div
        data-testid="error-guide"
        className="p-20 flex flex-col items-center justify-center h-1/2  bg-gray-100 text-center pb-40"
        style={{height: 'calc(100vh - 108px)'}}
      >
        <h2 className="mt-4 text-4xl text-red-500">{title}</h2>
        <p className="mb-7 text-xl text-gray-600">{description}</p>

        <Button className="mt-4" onClick={handleTitleClick}>
          Go to Pokedex Home
        </Button>
      </div>

      <Footer />
    </>
  );
}
