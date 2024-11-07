import {Container, Header} from 'semantic-ui-react';
import {useEffect, useState} from 'react';

export default function CardEmpty() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Container
      data-testid="card-empty"
      textAlign="center"
      className="w-full transition-opacity duration-500 ease-in-out"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
        opacity: isVisible ? 1 : 0,
      }}
    >
      <Header as="h2">No Pokemon Found</Header>

      <p style={{marginTop: '20px', fontSize: '1.1rem'}}>
        Cannot find any Pokemon matching your search.
      </p>
    </Container>
  );
}
