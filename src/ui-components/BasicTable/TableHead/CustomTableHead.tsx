import React from 'react';

import { nanoid } from 'nanoid';

import { Block } from '../../../ui-styled-components/common';
import { TableTitleType } from '../BasicTable';

type TableHeadPropsType = {
  titles: TableTitleType[];
  minWidth: number | string;
};
/**
 * JSX Component( CustomTableHead )
 * Принимает пропсы :
 * @param {TableTitleType[]} props.titles - Заголовки таблицы ( обязательный )
 * @param { number | string} props.minWidthTable - Минимальная ширина таблицы ( обязательный )
 */
export const CustomTableHead = (props: TableHeadPropsType) => {
  return (
    <Block
      name={'Table Head'}
      background={'#E8E8E8'}
      width={'100%'}
      justifyContent={'flex-start'}
      height={'36px'}
      minWidth={props.minWidth}
    >
      {props.titles.map((title) => (
        <Block
          name={'Title'}
          key={nanoid()}
          flexWrap={'nowrap'}
          width={title.width}
          margin={'0 0 0 24px'}
          padding={title.padding}
          justifyContent={'flex-start'}
        >
          <strong>{title.value}</strong>
        </Block>
      ))}
    </Block>
  );
};
