import React, { CSSProperties, useState } from 'react';

import { Button, TextField, Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
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

interface EditableSpanProps {
  value: string;
  onChange: (newValue: string) => void;
  label: string;
  onSave?: (value: string) => void;
  showIcon?: boolean;
  customStyle?: CSSProperties;
}

const EditableSpan: React.FC<EditableSpanProps> = ({
  value,
  onChange,
  label,
  onSave,
  showIcon = false,
  customStyle = {},
}) => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

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

  const isEmptyValue = tempValue.trim() === '';
  const defaultContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginRight: '10px',
  };
  const customContainerStyle = { ...defaultContainerStyle, ...customStyle };

  return (
    <div style={customContainerStyle}>
      {isEditing ? (
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id={label + '-id'}
            label={label}
            value={tempValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoFocus
            size={'small'}
            error={isEmptyValue}
            helperText={isEmptyValue ? 'Введите название стрима' : ''}
          />
          <Button variant="contained" color="success" onClick={handleSave}>
            ✓
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            🗙
          </Button>
        </form>
      ) : (
        <Tooltip
          title={
            isEmptyValue
              ? 'Значение пустое. Нажмите дважды, чтобы отредактировать'
              : label + '. Нажмите дважды, чтобы отредактировать'
          }
        >
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: '24px',
              display: 'flex',
              alignItems: 'center',
            }}
            onDoubleClick={handleDoubleClick}
          >
            {isEmptyValue ? (
              <span style={{ color: 'red' }}>Значения нет</span>
            ) : (
              value
            )}
            {showIcon && (
              <span style={{ marginLeft: '5px', fontSize: '20px' }}>🖉</span>
            )}
          </Typography>
        </Tooltip>
      )}
    </div>
  );
};

export default EditableSpan;
