import React from 'react';
import {Pagination as SemanticPagination} from 'semantic-ui-react';
import {useRouter} from 'next/router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({currentPage, totalPages, onPageChange}: PaginationProps) {
  const router = useRouter();

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

  return (
    <div
      // data-testid="pagination"
      className="flex justify-center z-10 py-4 relative border-t-2 border-gray-200 bg-gray-50"
    >
      <SemanticPagination
        activePage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        defaultActivePage={5}
      />
    </div>
  );
}
