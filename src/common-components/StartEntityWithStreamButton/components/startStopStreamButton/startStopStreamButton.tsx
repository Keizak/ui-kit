import React, { memo } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';

import { CustomButton } from '../../styles';
import { statStopStreamButtonPropsType } from '../../types';

export const StartStopStreamButton = memo(
  ({
    selectedStream,
    entityTitle,
    clickStartStopStreamHandler,
    clickSettingsHandler,
    requestStatus,
    disabled,
  }: statStopStreamButtonPropsType) => {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <CustomButton
          requestStatus={requestStatus}
          variant={'outlined'}
          onClick={clickStartStopStreamHandler}
          disabled={disabled}
        >
          <Tooltip
            title={
              selectedStream.link
                ? selectedStream.link
                : 'что то пошло нетак, ссылки нету, напиши марго'
            }
          >
            <>
              {selectedStream.startedStreamSession ? 'Stop ' : 'Start '}
              {entityTitle}
            </>
          </Tooltip>
        </CustomButton>
        <InfoIcon
          onClick={clickSettingsHandler}
          sx={{
            marginLeft: '15px',
            color: '#1976d2',
            fontSize: '36px',
            cursor: 'pointer',
          }}
        />
      </div>
    );
  }
);
