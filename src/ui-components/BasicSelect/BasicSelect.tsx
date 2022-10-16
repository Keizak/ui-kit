import React, { ReactNode, useState } from 'react';

import {
  Box,
  createTheme,
  FormControl,
  MenuItem,
  OutlinedInput,
  SelectChangeEvent,
  Theme,
  ThemeProvider,
} from '@mui/material';
import { DefaultTheme, SxProps } from '@mui/system';
import { nanoid } from 'nanoid';

import {
  Block,
  StyledKeyboardArrowDownIcon,
  StyledSelect,
} from '../../ui-styled-components/common';

export type BasicSelectProps = {
  label: string;
  options: Array<string | number>;
  onSelect: (value: any) => void;
  minWidth?: number | string;
  size?: 'small' | 'medium' | undefined;
  opacityText?: number;
  margin?: number | string;
  height?: number | string;
  colorIcon?: string;
  colorText?: string;
  sx?: SxProps<Theme>;
  value?: string | string[] | number[];
  defaultValue?: string | string[];
  menuType?: 'vertical' | 'horizontal';
  menuItemWidth?: string;
  theme?: DefaultTheme;
  mode?: 'once' | 'multiple';
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
 * @param  {'once' | 'multiple'} props.mode - Режим выбора значения одиночный или множественный( необязательный )
 * @param  {string | string[]} props.value - Текущие значение инпута ( необязательный )
 * @param  {string | string[]} props.defaultValue - значение инпута по умолчанию( необязательный )
 * @param  {'vertical' | 'horizontal'} props.menuType - ось отображение значений в селекте ( необязательный )
 * @param  {string} props.menuItemWidth - Ширина одного значение в меню, по дефолту 50px ( необязательный )
 * @param  {DefaultTheme} props.theme - Тема для кастомизации классов material ui ( необязательный )
 */
export function BasicSelect(props: BasicSelectProps) {
  //--------------------------------------------Инициализируем переменные--------------------------------------------
  const {
    minWidth = 224,
    size = 'small',
    height = '36px',
    mode = 'once',
    value = '',
    menuItemWidth = '50px',
    menuType = 'vertical',
    theme = createTheme({}),
    defaultValue = '',
  } = props;

  const [selectValue, setSelectValue] = useState<string | string[] | number[]>(
    value
  );

  //---------------------------------------------Дополнительные функции---------------------------------------------

  /**
   * Функция обработчик выбора значения
   */
  const handleChange = (event: SelectChangeEvent<any>) => {
    let value = event.target.value;

    setSelectValue(value);
    props.onSelect && props.onSelect(value);
  };

  //-----------------------------------------------JSX-----------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: minWidth, margin: props.margin }}>
        <FormControl fullWidth sx={{ height: height, ...props.sx }}>
          {mode === 'once' ? (
            <StyledSelect
              displayEmpty
              value={selectValue}
              defaultValue={defaultValue}
              onChange={handleChange}
              input={<OutlinedInput />}
              size={size}
              renderValue={(value) =>
                value ? (
                  (selectValue as ReactNode)
                ) : (
                  <em
                    style={{
                      opacity: props.opacityText,
                      color: props.colorText,
                    }}
                  >
                    {props.label}-
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
                  {menuType === 'vertical' ? (
                    option
                  ) : (
                    <Block name={'item'} width={menuItemWidth} key={nanoid()}>
                      {option}
                    </Block>
                  )}
                </MenuItem>
              ))}
            </StyledSelect>
          ) : (
            <StyledSelect
              multiple
              value={selectValue}
              onChange={handleChange}
              input={<OutlinedInput />}
              defaultValue={defaultValue}
            >
              {props.options.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </StyledSelect>
          )}
        </FormControl>
      </Box>
    </ThemeProvider>
  );
}
