import React from 'react';

import { nanoid } from 'nanoid';

import { Block } from '../../../ui-styled-components';
import { TableRowType } from '../BasicTable';

type columnStyle = {
  width?: string;
  padding?: string;
};

type CustomTableBodyPropsType = {
  rows: TableRowType[];
  columnStyle: columnStyle[];
  minWidth: number | string;
  minHeightRow?: number | string;
};
/**
 * JSX Component( CustomTableBody )
 * Принимает пропсы :
 * @param {TableRowType[]} props.rows - Строки таблицы ( данные ) ( обязательный )
 * @param { string[]} props.columnStyle - Стиль для столбца, стили наклываются по порядку начиная с 0
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы ( обязательный )
 * @param { number | string} props.minHeightRow - Минимальная высота строки таблоицы ( необязательный )
 */
export const CustomTableBody = (props: CustomTableBodyPropsType) => {
  const { minHeightRow = '40px' } = props;

  return (
    <Block
      name={'Table body'}
      width={'100%'}
      display={'block'}
      minWidth={props.minWidth}
    >
      {props.rows.map((row, index) => (
        <Block
          name={'Table row'}
          key={index}
          justifyContent={'flex-start'}
          width={'100%'}
          height={'100%'}
          borderBottom={'1px solid #CFCFCF'}
          flexWrap={'nowrap'}
          minHeight={minHeightRow}

          // sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
        >
          {Object.keys(row).map((key, index) => {
            const currentRow = row[key] as any;

            return (
              <Block
                name={'Row value'}
                key={nanoid()}
                margin={'0 0 0 24px'}
                padding={props.columnStyle[index].padding}
                justifyContent={
                  currentRow && currentRow.justifyContent
                    ? currentRow.justifyContent
                    : 'flex-start'
                }
                width={props.columnStyle[index].width}
                overflow={''}
              >
                {currentRow && currentRow.value ? currentRow.value : currentRow}
              </Block>
            );
          })}
        </Block>
      ))}
    </Block>
  );
};
