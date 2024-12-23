import {apiRequestFailed404, networkError, zodValidationError} from '@/utils/constants';
import {ErrorGuide} from 'src/error';

interface QueryErrorProps {
  errorMessage: string | null | undefined;
}

export default function QueryError(props: QueryErrorProps) {
  const {errorMessage} = props;

  // Toast 방식으로 보여줄 수 있음
  const renderErrorGuide = () => {
    switch (errorMessage) {
      case zodValidationError:
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
      case apiRequestFailed404:
        return (
          <ErrorGuide
            title={apiRequestFailed404}
            // 간단한 형식의 String도 전달 가능
            description={'Did you edit the URL yourself...? If so, please select the card on the main page.'}
          />
        );
      case networkError:
        return (
          <ErrorGuide title={networkError} description={'Please check your internet connection.'} />
        );
      default:
        return (
          <ErrorGuide
            title={'Unexpected Error'}
            description={'Error has occurred from an unexpected side.'}
          />
        );
    }
  };

  return <>{renderErrorGuide()}</>;
}
