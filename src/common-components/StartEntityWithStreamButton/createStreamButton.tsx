import React, { CSSProperties, useState } from 'react';

import InfoIcon from '@mui/icons-material/Info';
import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

import { RequestStatuses } from '../../helpers';
import { ButtonRequest } from '../ButtonRequest/buttonRequest';

import { IStream, StreamTypes } from './api/api';
import { useCreateStreamButtonLogic } from './hooks/useCreateStreamButtonLogic';
import { StatusesPositionType } from './hooks/useStyleFunctions';
import { ActionConfirmation } from './modals/NotificationModal';
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

  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (selectedStream: IStream) => Promise<any>;
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
    onFinishCreateStream,
    onFinishStopStream,
    beforeStartStream,
  } = props;

  const { handlers, streamData, meetingsData, styleFunctions } =
    useCreateStreamButtonLogic({
      userId,
      type,
      asyncHandler,
      onFinishCreateStream,
      onFinishStopStream,
      beforeStartStream,
    });

  const { meetingLogicState, changeMeetingLogicState } = meetingsData;
  const { selectedStream, loading } = streamData;
  const {
    getContainerStyle,
    getPositionStatusBlock,
    getDisabledStartStreamButton,
  } = styleFunctions;

  const [actionConfirmationStatus, setActionConfirmationStatus] =
    useState(false);

  const [currentAction, setCurrentAction] = useState<'create' | 'stop' | null>(
    null
  );

  const actionConfirmationHandler = (action: 'create' | 'stop' | null) => {
    if (action === 'create') handlers.createMeeting.mutateAsync({}).finally();
    if (action === 'stop') handlers.clickStartStopStreamHandler();

    return setCurrentAction(null);
  };

  const getConfirmHandler = (action: 'create' | 'stop') => {
    setCurrentAction(action);
    setActionConfirmationStatus(true);
  };

  if (loading.state) {
    return <CircularProgress />;
  }

  const streamIsStarted = selectedStream.state?.startedStreamSession;

  const meetingIsCreatedWithStreamIsStarted =
    meetingLogicState.createMeeting && streamIsStarted;

  const meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted =
    meetingIsCreatedWithStreamIsStarted || streamIsStarted;

  const streamIsNotStartedMeetingIsNotCreated =
    !meetingLogicState.createMeeting && !streamIsStarted;

  return (
    <div style={getContainerStyle(statusPosition)}>
      {getPositionStatusBlock(statusPosition) === 'top' &&
        meetingLogicState.meetingCreatingStatus && (
          <StatusBlock position={statusPosition}>
            <InfoIcon sx={{ marginRight: '10px' }} />
            {meetingLogicState.meetingCreatingStatus}
          </StatusBlock>
        )}
      <div>
        {!!meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted && (
          <StartStopStreamButton
            requestStatus={requestStatus}
            selectedStream={selectedStream.state as IStream}
            entityTitle={entityTitle}
            clickSettingsHandler={handlers.clickSettingsHandler}
            clickStartStopStreamHandler={() => {
              getConfirmHandler('stop');
            }}
          />
        )}
        {streamIsNotStartedMeetingIsNotCreated && (
          <ButtonRequest
            variant="contained"
            onClick={() => {
              getConfirmHandler('create');
            }}
            disabled={getDisabledStartStreamButton(
              meetingLogicState.createMeetingLoading,
              selectedStream.state
            )}
            requestStatus={requestStatus}
            style={customButtonStyle}
            clearDisabledAfterClick={true}
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
      <ActionConfirmation
        title={`${currentAction} stream`}
        onConfirm={() => actionConfirmationHandler(currentAction)}
        content={'Вы уверены что хотите это сделать ?'}
        open={actionConfirmationStatus}
        setOpen={setActionConfirmationStatus}
      />
    </div>
  );
};

const StatusBlock = styled.div<{ position: StatusesPositionType }>`
  display: flex;
  align-items: center;
  margin: ${(props) => {
    switch (props.position) {
      case 'bottom':
        return '20px 0 0 0';
      case 'top':
        return '0 0 20px 0';
      case 'left':
        return '0 20px 0 0';
      case 'right':
        return '0 0 0 20px';
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
