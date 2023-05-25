import React from 'react';

import EditIcon from '@mui/icons-material/Edit';
import { Typography } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';

type TitleValuePropsType = {
  editable: boolean;
  label: string;

  value: string;
  handleDoubleClick: () => void;
};
export const TitleValue = ({
  editable,
  label,
  value,
  handleDoubleClick,
}: TitleValuePropsType) => {
  const defaultStyle = {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <Tooltip title={label + '. Нажмите дважды, чтобы отредактировать'}>
      <Typography
        sx={defaultStyle}
        onDoubleClick={editable ? handleDoubleClick : undefined}
      >
        <EditIcon sx={{ marginRight: '5px' }} />
        {value}
      </Typography>
    </Tooltip>
  );
};
