import React from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { Tooltip } from '@mui/material';
import styled from 'styled-components';

import { RequestStatuses } from '../../../helpers';
import { ButtonRequest } from '../../ButtonRequest/buttonRequest';
import { IStream } from '../api/api';

type statStopStreamButtonPropsType = {
  selectedStream: IStream;
  entityTitle: string;
  clickStartStopStreamHandler: () => void;
  clickSettingsHandler: () => void;
  requestStatus: RequestStatuses;
};
export const StartStopStreamButton = ({
  selectedStream,
  entityTitle,
  clickStartStopStreamHandler,
  clickSettingsHandler,
  requestStatus,
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
        sx={{
          backgroundColor: selectedStream.startedStreamSession
            ? 'red'
            : 'green',
          color: 'white',
          hover: {
            color: 'black',
          },
        }}
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
};

const CustomButton = styled(ButtonRequest)`
  :hover {
    color: black;
  }
`;
