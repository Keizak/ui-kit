import React, { memo } from 'react';

import { CircularProgress } from '@mui/material';

import { CreateStreamButtonModals } from './components';
import { ActionButtons } from './components/actionButtons/actionButtons';
import { StatusesBlock } from './components/statusBlock/StatusesBlock';
import { useCreateStreamButtonLogic } from './hooks';
import { createStreamButtonPropsType } from './types';

export const StartEntityWithStreamButton = memo(
  (props: createStreamButtonPropsType) => {
    const {
      title = 'Create Zoom-meeting',
      entityTitle = 'stream',
      statusPosition = 'right',
      withNameOfStream = false,
      entityId = null,
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
      statusMaxWidth,
      showError,
    } = props;

    //-----------------------------------------------useCreateStreamButtonLogic-----------------------------------------

    const {
      handlers,
      actionConfirmationData,
      streamData,
      meetingsData,
      styleFunctions,
      localLoading,
    } = useCreateStreamButtonLogic({
      userId,
      type,
      asyncHandler,
      onFinishCreateStream,
      onFinishStopStream,
      beforeStartStream,
      showError,
    });

    const { meetingLogicState, changeMeetingLogicState } = meetingsData;
    const { selectedStream, streamRequestIsRunning } = streamData;
    const {
      getContainerStyle,
      getShowStatusForStatusesBlock,
      getDisabledStartStreamButton,
    } = styleFunctions;

    //-----------------------------------------------Conditions---------------------------------------------------------

    const streamIsStarted = selectedStream.state?.startedStreamSession;

    const meetingIsCreatedWithStreamIsStarted =
      meetingLogicState.createMeeting && streamIsStarted;

    const meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted =
      meetingIsCreatedWithStreamIsStarted || streamIsStarted;

    const streamIsNotStartedMeetingIsNotCreated =
      !meetingLogicState.createMeeting && !streamIsStarted;

    //-----------------------------------------------------JSX----------------------------------------------------------

    if (streamData.loading.state || localLoading.state) {
      return <CircularProgress />;
    }

    return (
      <div style={getContainerStyle(statusPosition)}>
        <StatusesBlock
          position={statusPosition}
          allowPosition={'top'}
          getShowStatusForStatusesBlock={getShowStatusForStatusesBlock}
          meetingCreatingStatus={meetingLogicState.meetingCreatingStatus}
          createMeetingError={meetingLogicState.createMeetingError}
          maxWidth={statusMaxWidth}
        />
        <ActionButtons
          entityTitle={entityTitle}
          customButtonStyle={customButtonStyle}
          handlers={handlers}
          selectedStream={selectedStream}
          title={title}
          requestStatus={requestStatus}
          streamRequestIsRunning={streamRequestIsRunning}
          customButtonClassname={customButtonClassname}
          meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted={
            !!meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted
          }
          disabledCreateMeetingButton={getDisabledStartStreamButton(
            meetingLogicState.createMeetingLoading,
            selectedStream.state
          )}
          streamIsNotStartedMeetingIsNotCreated={
            streamIsNotStartedMeetingIsNotCreated
          }
          withNameOfStream={withNameOfStream}
          entityId={entityId}
        />

        <StatusesBlock
          position={statusPosition}
          allowPosition={'bottom'}
          getShowStatusForStatusesBlock={getShowStatusForStatusesBlock}
          meetingCreatingStatus={meetingLogicState.meetingCreatingStatus}
          createMeetingError={meetingLogicState.createMeetingError}
          maxWidth={statusMaxWidth}
        />
        <CreateStreamButtonModals
          selectedStream={selectedStream}
          actionConfirmationData={actionConfirmationData}
          changeMeetingLogicState={changeMeetingLogicState}
          handlers={handlers}
          meetingLogicState={meetingLogicState}
          entityTitle={entityTitle}
          courses={courses}
          technologies={technologies}
        />
      </div>
    );
  }
);
