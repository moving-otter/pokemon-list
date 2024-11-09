import {useRouter} from 'next/router';
import {ListParamsType} from '@/types/list-params';
import {initialListParams} from '@/utils/constants';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useEffect} from 'react';
import {Dropdown, Pagination} from 'semantic-ui-react';

interface PokemonPaginationProps {
  totalCount: number;
  totalPages: number;
  listParams: PokemonsListParam;  

  setListParams: (param: ListParamsType) => void;  
}

export default function PokemonPagination(props: PokemonPaginationProps) {
  const {totalCount, totalPages, listParams, setListParams} = props;
  const limitInitialValue = initialListParams.limit; // limit 초기값
  const router = useRouter();    
  const defaultLimitValue = router.query.limit ? Number(router.query.limit) : listParams.limit;

  const limitOptions = [
    {key: '1', value: limitInitialValue, text: limitInitialValue},
    {key: '2', value: 100, text: '100'},
    {key: '3', value: 200, text: '200'},
    {key: '4', value: totalCount, text: 'All'},
  ];

  // URL에서 가져온 {page, limit} 정보를 현재 페이지와 listParam에 할당
  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || limitInitialValue;
    
    setListParams({
      page,
      limit,
    });

    if (!router.query.page || !router.query.limit) {
      router.replace({
        pathname: router.pathname,
        query: {...router.query, page, limit},
      });
    }        
  }, [router.query.page, router.query.limit]);

  const handlePaginationChange = (e: React.MouseEvent, {activePage}: any) => {
    const page = Number(activePage);    
    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || limitInitialValue},
    });
  };

  const handleDropdownChange = (e: any, {value}: {value: number}) => {    
    router.push({
      pathname: router.pathname,
      query: {...router.query, page: 1, limit: value},
    });
  };

  return (
    <div
      data-testid="pagination"
      className="flex flex-col sm:flex-row justify-between items-center z-10 py-2 relative border-t-2 border-gray-100 bg-gray-50 px-6"
    >
      <div className="flex-grow flex justify-between">      
        <Pagination
          totalPages={totalPages}
          activePage={listParams.page}
          onPageChange={handlePaginationChange}
        />     
      </div>

      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <Dropdown
          selection
          options={limitOptions}
          onChange={handleDropdownChange}
          defaultValue={limitOptions.find((option) => option.value === defaultLimitValue)?.value}
        />
      </div>
    </div>
  );
}
