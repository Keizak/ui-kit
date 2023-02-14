import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useSnackbar } from 'notistack';

export const CloseSnackbarAction = ({ id }: any) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton
      style={{ marginTop: '0.1em' }}
      onClick={() => {
        closeSnackbar(id);
      }}
    >
      <CloseIcon />
    </IconButton>
  );
};
