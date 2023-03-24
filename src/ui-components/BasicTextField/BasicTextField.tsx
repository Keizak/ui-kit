import React, { ChangeEvent } from 'react';

import { TextField } from '@mui/material';

import { useDebounceOrThrottle } from '../../helpers';

interface TextFieldINType {
  handleOnChange?: any;
  name?: string;
  label?: string;
  errorText?: string;
  type?: string;
  onChange: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    value: string | number
  ) => void;
  defaultValue?: any;
  value?: any;
  multiline?: boolean;
  rows?: number;
  onBlur?: any;
  nullableTitle?: string;
}

export const BasicTextField: React.FC<TextFieldINType> = React.forwardRef(
  (props, ref) => {
    const {
      onChange,
      value,
      defaultValue,
      label,
      type,
      name,
      rows,
      multiline,
      handleOnChange,
      onBlur,
      nullableTitle,
    } = props;

    const customOnChange = (value: string) => {
      handleOnChange && handleOnChange(value);
    };

    const changeHandle = (
      event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      onChange(event, event.target.value);
      debounce(event.target.value);
    };

    let debounce = useDebounceOrThrottle('throttling', 200, customOnChange);

    return (
      <TextField
        inputRef={ref}
        margin="dense"
        id="name"
        name={name}
        onBlur={onBlur}
        label={label ? label : ''}
        type={type ? type : 'text'}
        size={'small'}
        variant="outlined"
        multiline={multiline}
        rows={rows}
        value={value}
        placeholder={nullableTitle ? nullableTitle : 'Not enter'}
        defaultValue={defaultValue}
        onChange={(event) => {
          changeHandle(event);
        }}
        fullWidth
      />
    );
  }
);
