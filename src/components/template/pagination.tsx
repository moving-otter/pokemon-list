import {useRouter} from 'next/router';
import {PokemonsListParam} from '@/services/pokemon/types';
import {useEffect, useState} from 'react';
import {Dropdown, Pagination as SemanticPagination} from 'semantic-ui-react';

interface PaginationProps {
  totalCount: number;
  totalPages: number;
  listParams: PokemonsListParam;

  setListParams: (param: any) => void;
}

export default function Pagination(props: PaginationProps) {
  const {totalCount, totalPages, listParams, setListParams} = props;
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const userSelectAll = listParams.limit === totalCount;
  const defaultLimitValue = router.query.limit ? Number(router.query.limit) : listParams.limit;
  const limitOptions = [
    {key: '20', value: 20, text: '20'},
    {key: '50', value: 50, text: '50'},
    {key: '100', value: 100, text: '100'},
    {key: totalCount, value: totalCount, text: 'All'},
  ];

  useEffect(() => {
    const page = Number(router.query.page) || 1;
    const limit = Number(router.query.limit) || 20;

    setCurrentPage(page);
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
    setCurrentPage(page);

    router.push({
      pathname: router.pathname,
      query: {...router.query, page, limit: listParams.limit || 20},
    });
  };

  const handleDropdownChange = (e: any, {value}: {value: number}) => {
    setListParams((prev: object) => ({
      ...prev,
      limit: value,
    }));

    setCurrentPage(1);
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
      <div className="flex-grow flex justify-between" style={{opacity: userSelectAll ? '0' : '1'}}>
        <SemanticPagination
          totalPages={totalPages}
          activePage={currentPage}
          onPageChange={handlePaginationChange}
        />
      </div>

      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0" style={{userSelect: 'none'}}>
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
