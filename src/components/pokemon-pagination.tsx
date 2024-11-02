import React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {useRouter} from 'next/router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function CustomPagination({currentPage, totalPages, onPageChange}: PaginationProps) {
  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
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
      count={totalPages}
      page={currentPage}
      onChange={handlePageChange}
      renderItem={(item) => (
        <PaginationItem
          {...item}
          sx={{
            typography: 'body1', // You can change this to any variant you prefer
            fontSize: '0.9rem', // Adjust the font size as needed
            minWidth: '36px', // Optional: ensure a minimum width for the items
            backgroundColor: '',
          }}
        />
      )}
      siblingCount={1} // Number of sibling pages to show
      boundaryCount={1} // Number of boundary pages to show
      color="primary"
    />
  );
}
