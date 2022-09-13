import React from 'react';

import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, OutlinedInput, Theme } from '@mui/material';
import { SxProps } from '@mui/system';

export type BasicInputPropsType = {
  placeholder: string;
  mode: 'search' | 'text';
  sx?: SxProps<Theme>;
  positionIcon?: 'start' | 'end';
  onChange: (value: string) => void;
  value: string;
};
/**
 * JSX Component( BasicInput )
 * Компонента представляющая базовый инпут использующийся в проекте, все кастомные инпуты рекомендуется делать на его
 * основе,имеет 2 режима, режим обычного инпута ,и поискового инпута
 * Принимает пропсы :
 * @param {string} props.placeholder значение отображаемое в пустом инпуте ( Обязательный )
 * @param {"search" | "text"} props.mode версия инпута, подставляющая уже определенные стили ( Обязательный )
 * @param {SxProps<Theme>} props.sx значения стилей которые перепишут уже существующие стили ( Необязательный )
 * @param {'start' | 'end'} props.positionIcon Позиция иконки в инпуте, начало/конец ( Необязательный )
 */
export const BasicInput = (props: BasicInputPropsType) => {
  /**
   * Дефолтные значения для компоненты
   */
  const defaultStyle = { width: '100%', height: '36px' };
  const defaultPositionIcon = 'start';
  /**
   * Выгрузка значений из пропсов, в случаи их отсутсвия , присвоение значений по дефолту
   */
  const {
    positionIcon = defaultPositionIcon,
    sx = defaultStyle,
    placeholder,
  } = props;

  switch (props.mode) {
    case 'search': {
      return (
        <OutlinedInput
          placeholder={placeholder}
          sx={{ ...defaultStyle, ...sx }}
          value={props.value}
          onChange={(event) => props.onChange(event.currentTarget.value)}
          startAdornment={
            <InputAdornment position={positionIcon}>
              <SearchIcon />
            </InputAdornment>
          }
        />
      );
    }
    case 'text': {
      return (
        <OutlinedInput
          placeholder={placeholder}
          sx={{ ...defaultStyle, ...sx }}
          value={props.value}
          onChange={(event) => props.onChange(event.currentTarget.value)}
        />
      );
    }
    default: {
      return <OutlinedInput />;
    }
  }
};
