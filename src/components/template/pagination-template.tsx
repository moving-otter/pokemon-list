import {useRouter} from 'next/router';
import {PokemonsListParam} from '@/services/pokemon/types';
import {Dropdown, Pagination} from 'semantic-ui-react';

interface PaginationTemplateProps {
  totalPages: number;
  listParams: PokemonsListParam;
  currentPage: number;

  onPageChange: (page: number) => void;
  setListParams: (param: any) => void;
  setCurrentPage: (page: number) => void;
}

export default function PaginationTemplate(props: PaginationTemplateProps) {
  const {currentPage, totalPages, listParams, onPageChange, setListParams, setCurrentPage} = props;
  const router = useRouter();
  const limitOptions = [
    {key: '20', value: 20, text: '20'},
    {key: '50', value: 50, text: '50'},
    {key: '100', value: 100, text: '100'},
    {key: '500', value: 500, text: '500'},
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

  // Use router.query.limit to set defaultValue for the Dropdown
  const defaultLimitValue = router.query.limit ? Number(router.query.limit) : listParams.limit;

  return (
    <div
      data-testid="pagination-template"
      className="flex flex-col sm:flex-row justify-between items-center z-10 py-4 relative border-t-2 border-gray-200 bg-gray-50 px-5"
    >
      <div className="flex-grow flex justify-between">
        <Pagination
          activePage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="w-full sm:w-auto flex justify-end mt-4 sm:mt-0">
        <Dropdown
          inline
          options={limitOptions}
          // Set defaultValue based on router.query.limit or listParams.limit
          defaultValue={limitOptions.find((option) => option.value === defaultLimitValue)?.value}
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
