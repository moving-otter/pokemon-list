import {CornerCaseGuide} from '@/components/molecule';

export default function Custom404() {
  return (
    <CornerCaseGuide
      errorCode={'404'}
      title={'Page Not Found'}
      description={'Sorry, the page you are looking for does not exist.'}
    />
  );
}
