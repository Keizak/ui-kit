import React, { ReactNode, useState } from 'react';

import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Theme,
} from '@mui/material';
import { SxProps } from '@mui/system';
import { nanoid } from 'nanoid';

import {
  StyledKeyboardArrowDownIcon,
  StyledSelect,
} from '../../ui-styled-components/common';

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
 */
export function BasicSelect(props: BasicSelectProps) {
  //--------------------------------------------Инициализируем переменные--------------------------------------------

  const [value, setValue] = useState<string>('');
  const { minWidth = 224, size = 'small', height = '36px' } = props;

  //---------------------------------------------Дополнительные функции---------------------------------------------

  /**
   * Функция обработчик выбора значения
   */
  const handleChange = (event: SelectChangeEvent | any) => {
    setValue(event.target.value as string);
    props.onSelect && props.onSelect(event.target.value as number);
  };

  //-----------------------------------------------JSX-----------------------------------------------

  return (
    <Box sx={{ minWidth: minWidth, margin: props.margin }}>
      <FormControl fullWidth sx={{ height: height, ...props.sx }}>
        <StyledSelect
          displayEmpty
          value={value}
          onChange={handleChange}
          input={<OutlinedInput />}
          size={size}
          renderValue={(value) =>
            value ? (
              (value as ReactNode)
            ) : (
              <em
                style={{ opacity: props.opacityText, color: props.colorText }}
              >
                {props.label}
              </em>
            )
          }
          IconComponent={(classes) => {
            return (
              <StyledKeyboardArrowDownIcon
                className={classes.className}
                sx={{ color: props.colorIcon }}
              />
            );
          }}
        >
          {props.options.map((option) => (
            <MenuItem key={nanoid()} value={option}>
              {option}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  );
}
