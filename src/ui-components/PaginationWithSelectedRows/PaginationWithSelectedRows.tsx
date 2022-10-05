import React from 'react';

import { Block } from '../../ui-styled-components/common';
import { BasicPagination } from '../BasicPagination/BasicPagination';

type PaginationWithSelectRows = {
  setPageSize: (pageSize: number) => void;
};

export interface IProps {
  currentPage: number;
  pagesCount: number;
  setCurrentPage: (currentPage: number) => void;
  totalCount?: number;
  pageSize?: number;
}

// eslint-disable-next-line no-redeclare
export const PaginationWithSelectRows: React.FC<
  PaginationWithSelectRows & IProps
> = ({
  currentPage = 1,
  pagesCount = 0,
  setCurrentPage,
  pageSize,
  setPageSize,
}) => {
  const rowsHandleChange = (value: any) => {
    setPageSize(value);
  };

  return (
    <Block name={'Pagination container'}>
      <BasicPagination
        currentPage={currentPage}
        optionsCountOnPage={['20', '50', '100']}
        countOnPages={pageSize}
        onSelectCountOnPage={rowsHandleChange}
        setCurrentPage={setCurrentPage}
        countPages={pagesCount}
      />
    </Block>
  );
};
