import {ErrorGuide} from '@/components/molecule';

import {apiRequestFailed404, zodValidationError} from '@/utils/constants';

interface QueryErrorProps {
  errorMessage: string | null | undefined;
}

export default function QueryError(props: QueryErrorProps) {
  const {errorMessage} = props;

  const renderErrorGuide = () => {
    if (errorMessage === zodValidationError) {
      return (
        <ErrorGuide
          title={zodValidationError}
          // 컴포넌트 형식으로 description 전달
          description={
            <>
              <p>One the of Backend API returned an unexpected data.</p>
              <p>Please check the network tab or contact to the Backend team in charge of it.</p>
            </>
          }
        />
      );
      // } else if (errorMessage === apiRequestFailed404) {
    } else if (true) {
      return (
        <ErrorGuide
          title={apiRequestFailed404}
          // 간단한 형식의 String도 전달 가능
          description={`Did you edit the URL yourself...? If so, please select the card on the main page.`}
        />
      );
    }
  };

  return <>{renderErrorGuide()}</>;
}
