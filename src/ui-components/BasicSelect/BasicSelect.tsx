import React from 'react';

import { Block } from '@mui/icons-material';
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
  StyledKeyboardArrowDownIcon,
  StyledSelect,
} from '../../ui-styled-components';

export type BasicSelectProps = {
  options: OptionType[];
  onSelect: (value: any) => void;
  minWidth?: number | string;
  size?: 'small' | 'medium' | undefined;
  opacityText?: number;
  margin?: number | string;
  height?: number | string;
  colorIcon?: string;
  colorText?: string;
  sx?: SxProps<Theme>;
  value?: string | string[] | number[] | number | null;
  defaultValue?: string | string[] | number | null;
  menuType?: 'vertical' | 'horizontal';
  menuItemWidth?: string;
  theme?: DefaultTheme;
  nullableTitle?: string;
  addNullableValue?: boolean;

  disabled?: boolean;
};

type OptionType = {
  title: string;
  value: string | number;
  disabled?: boolean;
};

export const NullString = '___65DYD3DGQWDG__';

export const BasicSelect: React.FC<BasicSelectProps> = ({
  theme = createTheme({}),
  onSelect,
  value = null,
  defaultValue = null,
  height = '36px',
  margin,
  sx,
  menuType = 'vertical',
  menuItemWidth = '50px',
  minWidth = 224,
  size = 'small',
  colorIcon,
  options,
  //opacityText,
  //colorText,
  nullableTitle = 'Not selected',
  disabled = false,
  addNullableValue = true,
}) => {
  const parsedValue =
    // eslint-disable-next-line no-nested-ternary
    !value && !addNullableValue
      ? NullString
      : !value && addNullableValue
      ? NullString
      : value;

  // const [selectValue, setSelectValue] = useState<
  //   string | string[] | number[] | null | number
  // >(parsedValue);

  let nullableItem = { value: NullString, title: nullableTitle };

  defaultValue = defaultValue === null ? NullString : defaultValue;

  //---------------------------------------------Дополнительные функции---------------------------------------------
  /**
   * Функция обработчик выбора значения
   */
  const handleChange = (event: SelectChangeEvent<any>) => {
    let value = event.target.value;

    if (!onSelect) return;

    if (value === NullString) {
      onSelect(null);
      //setSelectValue(NullString);
    } else {
      onSelect(value);
      //setSelectValue(value);
    }
  };

  //-----------------------------------------------JSX-----------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: minWidth, margin: margin }}>
        <FormControl fullWidth sx={{ height: height, ...sx }}>
          <StyledSelect
            displayEmpty
            value={parsedValue}
            disabled={disabled}
            defaultValue={defaultValue}
            onChange={handleChange}
            input={<OutlinedInput />}
            size={size}
            IconComponent={(classes) => {
              return (
                <StyledKeyboardArrowDownIcon
                  className={classes.className}
                  sx={{ color: colorIcon }}
                />
              );
            }}
          >
            {addNullableValue && (
              <MenuItem value={nullableItem.value}>
                {nullableItem.title}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                disabled={option.disabled}
              >
                {menuType === 'vertical' ? (
                  option.title
                ) : (
                  <Block name={'item'} width={menuItemWidth} key={nanoid()}>
                    {option.title}
                  </Block>
                )}
              </MenuItem>
            ))}
          </StyledSelect>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};
