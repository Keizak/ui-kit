import React, { memo } from 'react';

import { ButtonRequest } from '../../../ButtonRequest/buttonRequest';
import { IStream, ActionButtonsPropsType } from '../../types';
import { StartStopStreamButton } from '../startStopStreamButton/startStopStreamButton';

export const ActionButtons = memo(
  ({
    meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted,
    streamIsNotStartedMeetingIsNotCreated,
    requestStatus,
    selectedStream,
    entityTitle,
    handlers,
    disabledCreateMeetingButton,
    customButtonStyle,
    customButtonClassname,
    title,
  }: ActionButtonsPropsType) => {
    return (
      <div>
        {meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted && (
          <StartStopStreamButton
            requestStatus={requestStatus}
            selectedStream={selectedStream.state as IStream}
            entityTitle={entityTitle}
            clickSettingsHandler={handlers.clickSettingsHandler}
            clickStartStopStreamHandler={() => {
              handlers.getConfirmHandler('stop');
            }}
          />
        )}

        {streamIsNotStartedMeetingIsNotCreated && (
          <ButtonRequest
            variant="contained"
            onClick={() => {
              handlers.getConfirmHandler('start');
            }}
            disabled={disabledCreateMeetingButton}
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
    );
  }
);
