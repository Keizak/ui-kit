import React from 'react';

import { nanoid } from 'nanoid';

import { Block } from '../../ui-styled-components';

import { ToggleItem } from './ToggleItem/ToggleItem';

export type ToggleBarPropsType = {
  selectedValue: string;
  values: string[];
  selectValue: (value: string) => void;
  flexWrap?: string;
};
/**
 * JSX Component( ToggleBar )
 * Принимает пропсы :
 * @param {string} props.selectedValue Выбранное значение ( Обязательный )
 * @param {string[]} props.values список значение для отрисовка кнопки выбора ( Обязательный )
 * @param {(value:string) => void} props.selectValue функция для выбора значения ( Обязательный )
 */
export const ToggleBar = (props: ToggleBarPropsType) => {
  const { flexWrap = 'nowrap' } = props;
  //-----------------------------------------------JSX-----------------------------------------------

  return (
    <Block name={'Toggle'} width={'100%'} flexWrap={flexWrap}>
      {props.values.map((value) => {
        return (
          <ToggleItem
            key={nanoid()}
            title={value}
            active={value === props.selectedValue}
            onClick={() => props.selectValue(value)}
          />
        );
      })}
    </Block>
  );
};
