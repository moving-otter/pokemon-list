// import {Button} from '@mui/material';
import React from 'react';
import {Button} from 'semantic-ui-react';

export default function TestAPIComponent() {
  const handleButtonClick = () => {
    console.log('check/test'); // Log "test" to the console when the button is clicked
  };

  return (
    <div>
      <Button basic color="black">
        Black
      </Button>
    </div>
  );
}
