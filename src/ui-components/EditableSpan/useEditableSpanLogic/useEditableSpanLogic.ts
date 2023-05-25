import React, { CSSProperties, useEffect, useState } from 'react';

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& .MuiTextField-root': {
      margin: '10px',
      width: '100%',
    },
    '& .MuiButton-root': {
      height: '30px',
      margin: '0 2px 0 2px',
    },
  },
}));

type useEditableSpanLogicParamsType = {
  value: string;
  defaultValue: string;
  onChange: (newValue: string) => void;
  onSave?: (value: string) => void;
  customStyle?: CSSProperties;
};
export const useEditableSpanLogic = ({
  defaultValue,
  value,
  onChange,
  onSave,
  customStyle,
}: useEditableSpanLogicParamsType) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(defaultValue);

  const isEmptyTempleValue = tempValue.trim() === '';
  const isEmptyValue = value.trim() === '';

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    if (tempValue !== value) {
      onChange(tempValue);
      onSave && onSave(tempValue);
    }
  };

  const handleCancel = () => {
    if (isEmptyValue) return;
    setIsEditing(false);
    setTempValue(value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSave();
    }
  };

  const defaultContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: '10px',
  };
  const customContainerStyle = { ...defaultContainerStyle, ...customStyle };

  useEffect(() => {
    if (isEmptyValue) setIsEditing(true);
  }, [isEmptyValue]);

  return {
    handlers: {
      handleDoubleClick,
      handleKeyDown,
      handleChange,
      handleCancel,
      handleSave,
    },
    values: {
      customContainerStyle,
      isEmptyTempleValue,
      classes,
      isEditing,
      tempValue,
      isEmptyValue,
    },
  };
};
