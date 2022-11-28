import {
    Box,
    createTheme,
    FormControl, MenuItem, OutlinedInput,
    SelectChangeEvent,
    Theme,
    ThemeProvider
} from "@mui/material";
import React, {useState} from "react";
import {DefaultTheme, SxProps} from "@mui/system";
import {nanoid} from "nanoid";
import {Block} from "@mui/icons-material";
import {StyledKeyboardArrowDownIcon, StyledSelect } from "../../ui-styled-components/common";

export type BasicSelectProps = {
    label: string;
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
    value?: string | string[] | number[];
    defaultValue?: string | string[];
    menuType?: 'vertical' | 'horizontal';
    menuItemWidth?: string;
    theme?: DefaultTheme;
    mode?: 'once' | 'multiple';
    nullableTitle?: string
    addNullableValue?: boolean
};

type OptionType = {
    title: string
    value: string | number
}

export const NullString = '___65DYD3DGQWDG__'

export const BasicSelect: React.FC<BasicSelectProps> = ({
                                                            theme = createTheme({}),
                                                            onSelect,
                                                            mode,
                                                            value,
                                                            defaultValue,
                                                            height,
                                                            margin,
                                                            sx,
                                                            menuType,
                                                            menuItemWidth,
                                                            minWidth,
                                                            label,
                                                            size,
                                                            colorText,
                                                            colorIcon,
                                                            opacityText,
                                                            options,
                                                            nullableTitle = 'Not selected',
                                                            addNullableValue = false
                                                        }) => {

    const [selectValue, setSelectValue] = useState<string | string[] | number[]>(
        !value ? NullString : value
    );

    let nullableItem = {value: NullString, title: nullableTitle}

    defaultValue = defaultValue === null ? NullString : defaultValue

    //---------------------------------------------Дополнительные функции---------------------------------------------

    /**
     * Функция обработчик выбора значения
     */
    const handleChange = (event: SelectChangeEvent<any>) => {
        let value = event.target.value;

        setSelectValue(value);
        onSelect && onSelect(value);
    };

    //-----------------------------------------------JSX-----------------------------------------------


    return (
        <ThemeProvider theme={theme}>
            <Box sx={{minWidth: minWidth, margin: margin}}>
                <FormControl fullWidth sx={{height: height, ...sx}}>
                    {mode === 'once' ? (
                        <StyledSelect
                            displayEmpty
                            value={selectValue}
                            defaultValue={defaultValue}
                            onChange={handleChange}
                            input={<OutlinedInput/>}
                            size={size}
                            renderValue={(value) =>
                                value ? (
                                    <span
                                        style={{
                                            opacity: opacityText,
                                            color: colorText,
                                        }}
                                    >
                            {selectValue}
                                </span>
                                ) : (
                                    <em
                                        style={{
                                            opacity: opacityText,
                                            color: colorText,
                                        }}
                                    >
                                        {label}
                                    </em>
                                )
                            }
                            IconComponent={(classes) => {
                                return (
                                    <StyledKeyboardArrowDownIcon
                                        className={classes.className}
                                        sx={{color: colorIcon}}
                                    />
                                );
                            }}
                        >
                            {addNullableValue && <MenuItem
                                value={nullableItem.value}>{nullableItem.title}</MenuItem>}
                            {options.map((option) => (
                                <MenuItem key={nanoid()} value={option.value}>
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
                    ) : (
                        <StyledSelect
                            multiple
                            value={selectValue}
                            onChange={handleChange}
                            input={<OutlinedInput/>}
                            defaultValue={defaultValue}
                        >
                            {addNullableValue && <MenuItem
                                value={nullableItem.value}>{nullableItem.title}</MenuItem>}
                            {options.map((name) => (
                                <MenuItem key={name.value} value={name.value}>
                                    {name.title}
                                </MenuItem>
                            ))}
                        </StyledSelect>
                    )}
                </FormControl>
            </Box>
        </ThemeProvider>
    )
};
