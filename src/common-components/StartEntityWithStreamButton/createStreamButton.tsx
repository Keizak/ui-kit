import React, { CSSProperties } from 'react';

import { CircularProgress } from '@mui/material';

import { RequestStatuses } from '../../helpers';
import { ButtonRequest } from '../ButtonRequest/buttonRequest';

import { StreamTypes } from './api/api';
import { useLocalHandlers } from './hooks/useLocalHandlers';
import { useMeetingLogic } from './hooks/useMeetingLogic';
import { useStreamsData } from './hooks/useStreamsData';
import {
  StatusesPositionType,
  useStyleFunctions,
} from './hooks/useStyleFunctions';
import { SettingStreamModal } from './modals/SettingStreamModal';
import { StartStopStreamButton } from './startStopStreamButton/startStopStreamButton';

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

  //------------------------------------------------useStyleFunctions---------------------------------------------------

  const {
    getContainerStyle,
    getPositionStatusBlock,
    getDisabledStartStreamButton,
  } = useStyleFunctions();

  //-------------------------------------------------useStreamsData-----------------------------------------------------

  const streamsDataParams = {
    type,
    userId,
  };

  const { streamsApi, selectedStream, loading } =
    useStreamsData(streamsDataParams);

  //-------------------------------------------------useMeetingLogic----------------------------------------------------

  const meetingLogicParams = {
    selectedStream,
    updateStream: streamsApi.updateStream,
  };

  const { changeMeetingLogicState, meetingLogicState } =
    useMeetingLogic(meetingLogicParams);

  //-------------------------------------------------useLocalHandlers---------------------------------------------------
  const localHandlersParams = {
    changeMeetingLogicState,
    asyncHandler,
    selectedStream,
    streamsApi,
  };

  const { handlers } = useLocalHandlers(localHandlersParams);

  //-------------------------------------------------------JSX----------------------------------------------------------

  if (loading.state) {
    return <CircularProgress />;
  }

  return (
    <div style={getContainerStyle(statusPosition)}>
      {getPositionStatusBlock(statusPosition) === 'top' && (
        <div style={{ marginLeft: '10px' }}>
          {meetingLogicState.meetingCreatingStatus}
        </div>
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
      {getPositionStatusBlock(statusPosition) === 'bottom' && (
        <div style={{ marginLeft: '10px' }}>
          {meetingLogicState.meetingCreatingStatus}
        </div>
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
  );
};
