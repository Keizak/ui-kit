import React, { ReactNode } from 'react';

import { Block } from '../../ui-styled-components/common';
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
  paginationOptions?: BasicPaginationPropsType;
  pagination?: boolean;
};

//---------------------------------------------------------------------------------------------------------

/**
 * JSX Component( BasicTable )
 * Принимает пропсы :
 * @param {TableTitleType[]} props.titles - Заголовки таблицы ( обязательный )
 * @param {TableRowType[]} props.rows - Строки таблицы ( данные ) ( обязательный )
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы
 * @param {BasicPaginationPropsType} props.paginationOptions - Настройки пагинатора ( необязательный )
 * @param {boolean} props.pagination - включает и выключает блок с пагинатором
 */
export const BasicTable = (props: BasicTablePropsType) => {
  const { pagination = true } = props;
  //-------------------------------------------------JSX-----------------------------------------------------

  return (
    <Block
      name={'Table with Paginator Container'}
      width={'100%'}
      margin={'24px 0 50px 0'}
      display={'block'}
    >
      <Block name={'Table Container'} display={'block'} overflow={'auto'}>
        <CustomTableHead titles={props.titles} minWidth={props.minWidthTable} />
        <CustomTableBody
          rows={props.rows}
          minWidth={props.minWidthTable}
          columnStyle={props.titles.map((title) => ({
            width: title.width,
            padding: title.padding,
          }))}
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
