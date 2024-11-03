import React from 'react';
import {Segment, Dimmer, Loader} from 'semantic-ui-react';

export default function LargeLoading() {
  return (
    <Segment className="h-screen w-screen" style={{borderTop: 'none'}}>
      <Dimmer active inverted>
        <Loader size="large">Loading</Loader>
      </Dimmer>
    </Segment>
  );
}
