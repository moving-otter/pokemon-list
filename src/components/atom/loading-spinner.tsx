import {useEffect, useState} from 'react';
import {Segment, Dimmer, Loader} from 'semantic-ui-react';

export default function LoadingSpinner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Segment
      data-testid="loading-spinner"
      className="h-screen w-screen transition-opacity duration-1000"
      style={{
        margin: '0',
        border: 'none',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease',
      }}
    >
      <Dimmer active inverted>
        <Loader size="medium"></Loader>
      </Dimmer>
    </Segment>
  );
}
