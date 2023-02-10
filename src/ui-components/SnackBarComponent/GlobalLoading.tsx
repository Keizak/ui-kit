import React from 'react';

import { Box, LinearProgress } from '@mui/material';

type GlobalLoadingPropsType = {
  requestStatus: number;
};
export const GlobalLoading = (props: GlobalLoadingPropsType) => {
  /**
   * requestStatus - None = 0, InProgress = 1, Finished = 2,
   */
  return (
    <>
      {props.requestStatus === 1 && (
        <Box
          sx={{
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
          }}
        >
          <LinearProgress color="success" />
        </Box>
      )}
    </>
  );
};
