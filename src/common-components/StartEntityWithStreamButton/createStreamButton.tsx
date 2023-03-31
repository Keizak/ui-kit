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
  type: StreamTypes | StreamTypes[];
  userId: number;
  requestStatus: RequestStatuses;
  customButtonStyle?: CSSProperties;
  customButtonClassname: string;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;

  courses?: courseType[];
  technologies?: technologyType[];

  statusPosition?: StatusesPositionType;

  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (
    selectedStream: IStream,
    set: (stream: IStream) => void
  ) => Promise<any>;
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
    customButtonClassname,
    asyncHandler,
    onFinishCreateStream,
    onFinishStopStream,
    beforeStartStream,
    courses,
    technologies,
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

  const [currentAction, setCurrentAction] = useState<'start' | 'stop' | null>(
    null
  );

  const actionConfirmationHandler = (action: 'start' | 'stop' | null) => {
    if (action === 'start') handlers.createMeeting.mutateAsync({}).finally();
    if (action === 'stop') handlers.clickStartStopStreamHandler();

    return setTimeout(() => setCurrentAction(null), 1000);
  };

  const getConfirmHandler = (action: 'start' | 'stop') => {
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
              getConfirmHandler('start');
            }}
            disabled={getDisabledStartStreamButton(
              meetingLogicState.createMeetingLoading,
              selectedStream.state
            )}
            requestStatus={requestStatus}
            style={customButtonStyle}
            className={customButtonClassname}
            clearDisabledAfterClick={true}
          >
            {selectedStream.state
              ? title
              : `You don't have access to this type of streams`}
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
          courses={courses}
          technologies={technologies}
        />
      )}
      <ActionConfirmation
        title={`${currentAction} ${entityTitle}`}
        onConfirm={() => actionConfirmationHandler(currentAction)}
        content={chooseText(currentAction, entityTitle)}
        open={actionConfirmationStatus}
        setOpen={setActionConfirmationStatus}
      />
    </div>
  );
};

const chooseText = (
  currentAction: 'start' | 'stop' | null,
  entityTitle: string
) => {
  switch (currentAction) {
    case 'start':
      return `Потверждая данное действие, автоматически запустится зум конференция и ${entityTitle} сессия.`;
    case 'stop':
      return `Потверждая данное действие, автоматически выключается ${entityTitle} сессия, но не завершается зум конференция.
          Пожалуйста не забудь её закрыть!`;
    default:
      return '';
  }
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

export type courseType = {
  title: string;
  type: number;
  id: number;
  addedAt: string;
  updatedAt: string;
  addedBy: number;
  updatedBy: number;
};

export type technologyType = {
  title: string;
  id: number;
  addedAt: string;
  updatedAt: string;
  addedBy: number;
  updatedBy: number;
};
