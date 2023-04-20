import React, { ReactNode } from 'react';

import { Block } from '../../ui-styled-components';
import {
  BasicPagination,
  BasicPaginationPropsType,
} from '../BasicPagination/BasicPagination';

import { CustomTableBody } from './TableBody/CustomTableBody';
import { CustomTableHead } from './TableHead/CustomTableHead';

//-------------------------------------------------Types-----------------------------------------------------

export type CustomRowType = {
  value: ReactNode;
  justifyContent: string;
  padding?: string;
};

export type TableTitleType = {
  width: string;
  value: string;
  padding?: string;
};
export type TableRowType = Record<string, ReactNode | CustomRowType>;

export type BasicTablePropsType = {
  titles: TableTitleType[];
  rows: TableRowType[];
  minWidthTable: number | string;
  minHeightRow?: number | string;
  paginationOptions?: BasicPaginationPropsType;
  pagination?: boolean;
  maxHeightTable?: string;
};

//---------------------------------------------------------------------------------------------------------

/**
 * JSX Component( BasicTable )
 * Принимает пропсы :
 * @param {TableTitleType[]} props.titles - Заголовки таблицы ( обязательный )
 * @param {TableRowType[]} props.rows - Строки таблицы ( данные ) ( обязательный )
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы
 * @param { number | string} props.minHeightRow - Минимальная высота строки таблоицы ( необязательный )
 * @param {BasicPaginationPropsType} props.paginationOptions - Настройки пагинатора ( необязательный )
 * @param {boolean} props.pagination - включает и выключает блок с пагинатором ( необязательный )
 * @param {string} props.maxHeightTable - Высота самой таблицы без учета пагинации ( необязательный )
 */
export const BasicTable = (props: BasicTablePropsType) => {
  const { pagination = true, maxHeightTable } = props;
  //-------------------------------------------------JSX-----------------------------------------------------

  return (
    <Block
      name={'Table with Paginator Container'}
      width={'100%'}
      margin={'24px 0 50px 0'}
      display={'block'}
    >
      <Block
        name={'Table Container'}
        display={'block'}
        overflow={'auto'}
        maxHeight={maxHeightTable}
      >
        <CustomTableHead titles={props.titles} minWidth={props.minWidthTable} />
        <CustomTableBody
          rows={props.rows}
          minWidth={props.minWidthTable}
          columnStyle={props.titles.map((title) => ({
            width: title.width,
            padding: title.padding,
          }))}
          minHeightRow={props.minHeightRow}
        />
      </Block>

      {pagination && (
        <Block
          name={'Pagination'}
          width={'100%'}
          justifyContent={'flex-start'}
          margin={'38px 0 0 0 '}
        >
          <BasicPagination {...props.paginationOptions} />
        </Block>
      )}
    </Block>
  );
};
