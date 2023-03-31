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
  color: #f51a51 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  min-height: 36px !important;
  border-radius: 30px !important;
  border: 1px solid #f51a51 !important;
  gap: 10px !important;
  background-color: white !important;
  transition: 0.3s ease-in-out !important;
  opacity: 1 !important;
  :hover {
    color: black;
  }
`;
