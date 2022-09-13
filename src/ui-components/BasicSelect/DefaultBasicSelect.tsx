import React, { ReactNode } from 'react';

import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
} from '@mui/material';
import { nanoid } from 'nanoid';

import {
  StyledKeyboardArrowDownIcon,
  StyledSelect,
} from '../../ui-styled-components/common';

import { BasicSelectProps } from './BasicSelect';

interface DefaultBasicSelectType extends BasicSelectProps {
  value: string;
  handleChange: (event: SelectChangeEvent | any) => void;
}

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
export const DefaultBasicSelect = (props: DefaultBasicSelectType) => {
  return (
    <Box sx={{ minWidth: props.minWidth, margin: props.margin }}>
      <FormControl fullWidth sx={{ height: props.height, ...props.sx }}>
        <StyledSelect
          displayEmpty
          value={props.value}
          onChange={props.handleChange}
          input={<OutlinedInput />}
          size={props.size}
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
                className={classes}
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
};
