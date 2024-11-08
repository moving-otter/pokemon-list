import {ErrorGuide} from '@/components/unexpected';

export default function Custom404() {
  return (
    <div data-testid="custom-404">
      <ErrorGuide
        title={'Page Not Found'}
        description={'Sorry, the page you are looking for does not exist.'}
      />
    </div>
  );
}
