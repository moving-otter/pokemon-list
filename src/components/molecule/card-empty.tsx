import React from 'react';
import {Container, Header} from 'semantic-ui-react';

export default function CardEmpty() {
  return (
    <Container
      textAlign="center"
      className="w-full"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '80%',
      }}
    >
      <Header as="h2">No Pokemon Found</Header>

      <p style={{marginTop: '20px', fontSize: '1.1rem'}}>
        It seems we couldn't find any Pokemon matching your search.
      </p>
    </Container>
  );
}