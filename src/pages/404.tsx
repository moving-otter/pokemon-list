import {NotFound404} from '@/components/molecule';

export default function Custom404() {
  return (
    <NotFound404
      title={'Page Not Found'}
      description={'Sorry, the page you are looking for does not exist.'}
    />
  );
}
