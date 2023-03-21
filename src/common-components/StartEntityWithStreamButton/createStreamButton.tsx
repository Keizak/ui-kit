import React, { CSSProperties } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import styled from 'styled-components';

import { RequestStatuses } from '../../helpers';
import { ButtonRequest } from '../ButtonRequest/buttonRequest';

import { StreamTypes } from './api/api';
import { useCreateStreamButtonLogic } from './hooks/useCreateStreamButtonLogic';
import { StatusesPositionType } from './hooks/useStyleFunctions';
import { SettingStreamModal } from './modals/SettingStreamModal';
import { StartStopStreamButton } from './startStopStreamButton/startStopStreamButton';

export const queryClient = new QueryClient();

export type createStreamButtonPropsType = {
  title?: string;
  entityTitle?: string;
  type: StreamTypes;
  userId: number;
  requestStatus: RequestStatuses;
  customButtonStyle?: CSSProperties;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;

  statusPosition?: StatusesPositionType;
};
export const StartEntityWithStreamButton = (
  props: createStreamButtonPropsType
) => {
  const {
    title = 'Create Zoom-meeting',
    entityTitle = 'stream',
    statusPosition = 'right',
    userId,
    requestStatus,
    type,
    customButtonStyle,
    asyncHandler,
  } = props;

  const { handlers, streamData, meetingsData, styleFunctions } =
    useCreateStreamButtonLogic({ userId, type, asyncHandler });

  const { meetingLogicState, changeMeetingLogicState } = meetingsData;
  const { selectedStream, loading } = streamData;
  const {
    getContainerStyle,
    getPositionStatusBlock,
    getDisabledStartStreamButton,
  } = styleFunctions;

  if (loading.state) {
    return <CircularProgress />;
  }

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <div style={getContainerStyle(statusPosition)}>
        {getPositionStatusBlock(statusPosition) === 'top' &&
          meetingLogicState.meetingCreatingStatus && (
            <StatusBlock position={statusPosition}>
              <InfoIcon sx={{ marginRight: '10px' }} />
              {meetingLogicState.meetingCreatingStatus}
            </StatusBlock>
          )}
        <div>
          {(meetingLogicState.createMeeting && selectedStream.state) ||
          selectedStream.state?.startedStreamSession ? (
            <StartStopStreamButton
              requestStatus={requestStatus}
              selectedStream={selectedStream.state}
              entityTitle={entityTitle}
              clickSettingsHandler={handlers.clickSettingsHandler}
              clickStartStopStreamHandler={handlers.clickStartStopStreamHandler}
            />
          ) : (
            <ButtonRequest
              variant="contained"
              onClick={() => {
                handlers.createMeeting.mutateAsync({}).finally();
              }}
              disabled={getDisabledStartStreamButton(
                meetingLogicState.createMeetingLoading,
                selectedStream.state
              )}
              requestStatus={requestStatus}
              style={customButtonStyle}
            >
              {title}
            </ButtonRequest>
          )}
        </div>
        {getPositionStatusBlock(statusPosition) === 'bottom' &&
          meetingLogicState.meetingCreatingStatus && (
            <StatusBlock position={statusPosition}>
              <InfoIcon sx={{ marginRight: '10px' }} />
              {meetingLogicState.meetingCreatingStatus}
            </StatusBlock>
          )}
        {selectedStream.state && (
          <SettingStreamModal
            open={meetingLogicState.settingsStreamStatusModal}
            setOpen={(value) =>
              changeMeetingLogicState({ settingsStreamStatusModal: value })
            }
            selectedStream={selectedStream.state}
          />
        )}
      </div>
    </QueryClientProvider>
  );
};

const StatusBlock = styled.div<{ position: StatusesPositionType }>`
  display: flex;
  align-items: center;
  margin: ${(props) => {
    switch (props.position) {
      case 'bottom':
        return '10px 0 0 0';
      case 'top':
        return '0 0 10px 0';
      case 'left':
        return '0 0 0 10px';
      case 'right':
        return '0 10px 0 0';
      default:
        return '';
    }
  }};
  font-family: 'Roboto', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #8c8889;
`;
