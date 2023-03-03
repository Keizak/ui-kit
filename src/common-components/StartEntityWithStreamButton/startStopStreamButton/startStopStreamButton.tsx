import React from 'react';

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import { Button, Tooltip } from '@mui/material';

import { IStream } from '../api/api';

type statStopStreamButtonPropsType = {
  selectedStream: IStream;
  streamStatus: boolean;
  entityTitle: string;
  clickStartStopStreamHandler: () => void;
  clickSettingsHandler: () => void;
};
export const StartStopStreamButton = ({
  selectedStream,
  streamStatus,
  entityTitle,
  clickStartStopStreamHandler,
  clickSettingsHandler,
}: statStopStreamButtonPropsType) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Button variant="contained" onClick={clickStartStopStreamHandler}>
        <Tooltip
          title={
            selectedStream.link
              ? selectedStream.link
              : 'что то пошло нетак, ссылки нету, напиши марго'
          }
        >
          <>
            {streamStatus ? 'Stop ' : 'Start '}
            {entityTitle}
          </>
        </Tooltip>
      </Button>
      <SettingsApplicationsIcon
        onClick={clickSettingsHandler}
        sx={{ marginLeft: '15px', color: '#1976d2', fontSize: '42px' }}
      />
    </div>
  );
};
