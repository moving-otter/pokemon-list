import React from 'react';
import {Pagination} from 'semantic-ui-react';
import {useRouter} from 'next/router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function PokemonPagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
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
    <Pagination
      activePage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      defaultActivePage={5}
    />
  );
}
