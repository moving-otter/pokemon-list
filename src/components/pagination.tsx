import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination(props: PaginationProps) {
  const {currentPage, totalPages, onPageChange} = props;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // 현재 페이지 기준으로 시작 페이지 계산
    const startPage = Math.max(1, currentPage - 2);
    // 현재 페이지 기준으로 끝 페이지 계산
    const endPage = Math.min(totalPages, startPage + 4);

    // 필요한 페이지 번호만 생성
    for (let i = startPage; i <= endPage; i++) {
      if (i <= totalPages) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => onPageChange(i)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === i ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {i}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center mt-4">
      <button
        className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &lt;&lt;
      </button>
      <button
        className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        className="mx-2 px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
