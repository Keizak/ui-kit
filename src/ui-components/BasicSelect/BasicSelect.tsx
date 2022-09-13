import React, { useState } from 'react';

import { SelectChangeEvent, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

import { Block, Text } from '../../ui-styled-components/common';

import { DefaultBasicSelect } from './DefaultBasicSelect';

type modeType = 'default' | 'withLabel';

export type BasicSelectProps = {
  label: string;
  options: Array<string | number>;
  onSelect: (value: number | string) => void;
  minWidth?: number | string;
  size?: 'small' | 'medium' | undefined;
  opacityText?: number;
  margin?: number | string;
  height?: number | string;
  colorIcon?: string;
  colorText?: string;
  sx?: SxProps<Theme>;
  mode?: modeType | undefined;
};

/**
 * JSX Component ( BasicSelect )
 * Универсальтный селектор подогнанный под текущий дизайн
 * Принимает следующие пропсы
 * @param  {string} props.label - Название селектора ( обязательный )
 * @param  {Array<string | number>} props.options - Параметры для выбора ( обязательный )
 * @param  { (value: number | string) => void} props.onSelect - функция выполняемая при выборе значения ( обязательный )
 * @param  {string} props.opacityText - Прозрачнасть текста ( необязательный )
 * @param  {number | string} props.minWidth - Минимальная ширина селектора ( необязательный )
 * @param  {"small" | "medium" | undefined} props.size - Общий размер селектора ( необязательный )
 * @param  {number | string} props.margin - Отстпы снаружи ( необязательный )
 * @param  {number | string} props.height - Высота селектора ( необязательный )
 * @param  {string} props.colorIcon - Цвет иконки ( необязательный )
 * @param  {string} props.colorText - Цвет текста в селекторе ( необязательный )
 * @param  {SxProps<Theme>} props.sx - дополнительные стили которые можно наложить поверх действующих ( необязательный )
 * @param  {modeType} props.mode - режим отображения селектора
 */
export function BasicSelect(props: BasicSelectProps) {
  //--------------------------------------------Инициализируем переменные--------------------------------------------

  const [value, setValue] = useState<string>('');
  const {
    minWidth = 224,
    size = 'small',
    height = '36px',
    mode = 'default',
    ...restProps
  } = props;

  //---------------------------------------------Дополнительные функции---------------------------------------------

  /**
   * Функция обработчик выбора значения
   */
  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value as string);
    props.onSelect && props.onSelect(event.target.value as number);
  };

  const chooseMode = (mode: modeType) => {
    switch (mode) {
      case 'default': {
        return (
          <DefaultBasicSelect
            minWidth={minWidth}
            size={size}
            value={value}
            height={height}
            handleChange={handleChange}
            {...restProps}
          />
        );
      }
      case 'withLabel': {
        return (
          <Block
            name={'Course filter'}
            flexDirection={'column'}
            alignItems={'flex-start'}
            margin={'0 14px 20px 0'}
          >
            <Text opacityText={0.5} fontSize={'14px'} margin={'0 0 8px 0'}>
              Course
            </Text>
            <DefaultBasicSelect
              {...props}
              value={value}
              handleChange={handleChange}
            />
          </Block>
        );
      }
      default:
        return (
          <DefaultBasicSelect
            minWidth={minWidth}
            size={size}
            value={value}
            height={height}
            handleChange={handleChange}
            {...restProps}
          />
        );
    }
  };

  //-----------------------------------------------JSX-----------------------------------------------

  return chooseMode(mode);
}
