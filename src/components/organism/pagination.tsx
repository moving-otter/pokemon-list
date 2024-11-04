import React from 'react';
import {Dropdown, Pagination as SemanticPagination} from 'semantic-ui-react';
import {useRouter} from 'next/router';
import {PokemonListParam} from '@/services/pokemon/types';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  listParams: PokemonListParam;
  onPageChange: (page: number) => void;
  setListParams: (param: any) => void;
  setCurrentPage: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const {currentPage, totalPages, listParams, onPageChange, setListParams, setCurrentPage} = props;

  const router = useRouter();
  const limitOptions = [
    {key: '20', value: 20, text: '20'},
    {key: '50', value: 50, text: '50'},
    {key: '100', value: 100, text: '100'},
    {key: '300', value: 300, text: '300'},
  ];

  const handlePageChange = (e: React.MouseEvent, {activePage}: any) => {
    const page = Number(activePage);
    onPageChange(page);
    updateURL(page);
  };

  const updateURL = (page: number) => {
    router.push({
      pathname: router.pathname,
      query: {...router.query, page},
    });
  };

  const handleLimitChange = (e: any, {value}: {value: number}) => {
    setListParams((prev: object) => ({
      ...prev,
      limit: value,
    }));
    setCurrentPage(1); // Reset to the first page
    router.push({
      pathname: router.pathname,
      query: {...router.query, page: 1, limit: value}, // Update the limit in the URL
    });
  };

  return (
    <div
      data-testid="pagination"
      className="flex flex-col sm:flex-row justify-between items-center z-10 py-4 relative border-t-2 border-gray-200 bg-gray-50 px-5"
    >
      <div className="flex-grow flex justify-between">
        <SemanticPagination
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <Dropdown
          inline
          options={limitOptions}
          defaultValue={limitOptions.find((option) => option.value === listParams.limit)?.value}
          //@ts-ignore
          onChange={handleLimitChange}
          selection
          placeholder="Select Limit"
          className="w-24"
        />
      </div>
    </div>
  );
}
