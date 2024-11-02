// import {Button} from '@mui/material';
import React from 'react';
import {Button, Dimmer, Loader, Segment, Image} from 'semantic-ui-react';
import {useQuery} from '@tanstack/react-query';

export default function TestAPIComponent() {
  const handleButtonClick = () => {
    console.log('check/test'); // Log "test" to the console when the button is clicked
  };

  return (
    <div>
      <Button basic color="black">
        Test API
      </Button>
    </div>
  );
}
