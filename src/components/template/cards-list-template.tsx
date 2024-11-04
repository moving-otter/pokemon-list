import React from 'react';
import {Card, Pagination} from '@/components/organism';

interface CardsListTemplateProps {
  setListParams: any;
  setCurrentPage: any;
  totalPages: any;
  listParams: any;
  currentPage: any;
  consolidatedData: any;
  handlePageChange: any;
}

export default function CardsListTemplate(props: CardsListTemplateProps) {
  const {
    handlePageChange,
    consolidatedData,
    currentPage,
    totalPages,
    listParams,
    setListParams,
    setCurrentPage,
  } = props;

  return (
    <>
      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-2">
          {consolidatedData?.map((card: any) => (
            <Card
              key={card.key}
              name={card.name}
              number={card.number}
              height={card.height}
              weight={card.weight}
              types={card.types}
              imageUrl={card.imageUrl}
            />
          ))}
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        listParams={listParams}
        setListParams={setListParams}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
