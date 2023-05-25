import React, { CSSProperties } from 'react';

import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton, TextField } from '@mui/material';

import { TitleValue } from './TitleValue/TitleValue';
import { useEditableSpanLogic } from './useEditableSpanLogic/useEditableSpanLogic';

interface EditableSpanProps {
  value: string;
  defaultValue: string;
  onChange: (newValue: string) => void;
  label: string;
  editable?: boolean;
  customStyle?: CSSProperties;
}

const EditableSpan: React.FC<EditableSpanProps> = ({
  value,
  onChange,
  label,
  editable = true,
  customStyle = {},
  defaultValue,
}) => {
  const { handlers, values } = useEditableSpanLogic({
    onChange,
    customStyle,
    defaultValue,
    value,
  });

  const {
    customContainerStyle,
    classes,
    isEditing,
    tempValue,
    isEmptyTempleValue,
    isEmptyValue,
  } = values;
  const {
    handleChange,
    handleKeyDown,
    handleSave,
    handleCancel,
    handleDoubleClick,
  } = handlers;

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
            error={isEmptyTempleValue}
            helperText={isEmptyTempleValue ? 'Введите название стрима' : ''}
          />
          <IconButton onClick={handleSave} color={'success'}>
            <DoneOutlineIcon />
          </IconButton>
          {!isEmptyValue && (
            <IconButton onClick={handleCancel} color={'error'}>
              <CancelPresentationIcon />
            </IconButton>
          )}
        </form>
      ) : (
        <TitleValue
          value={value}
          editable={editable}
          label={label}
          handleDoubleClick={handleDoubleClick}
        />
      )}
    </div>
  );
};

export default EditableSpan;
