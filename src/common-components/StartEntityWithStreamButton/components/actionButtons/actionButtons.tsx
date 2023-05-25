import React, { memo } from 'react';

import { CircularProgress } from '@mui/material';

import EditableSpan from '../../../../ui-components/EditableSpan/EditableSpan';
import { Block } from '../../../../ui-styled-components';
import { ButtonRequest } from '../../../ButtonRequest/buttonRequest';
import { useGetActionButtonsLogic } from '../../hooks/useGetActionButtonsLogic';
import { ActionButtonsPropsType, IStream } from '../../types';
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
    withNameOfStream,
    entityId,
    streamRequestIsRunning,
  }: ActionButtonsPropsType) => {
    const { values, localHandlers } = useGetActionButtonsLogic({
      entityId,
      disabledCreateMeetingButton,
      selectedStream,
      handlers,
    });

    return (
      <div>
        {!meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted &&
          !streamIsNotStartedMeetingIsNotCreated && <CircularProgress />}
        {meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted && (
          <StartStopStreamButton
            requestStatus={requestStatus}
            selectedStream={selectedStream.state as IStream}
            entityTitle={entityTitle}
            clickSettingsHandler={handlers.clickSettingsHandler}
            clickStartStopStreamHandler={() => {
              handlers.getConfirmHandler('stop');
            }}
            disabled={streamRequestIsRunning}
          />
        )}

        {streamIsNotStartedMeetingIsNotCreated && (
          <Block name={'NameAndButtonStartStreamContainer'}>
            {selectedStream.state &&
              withNameOfStream &&
              !disabledCreateMeetingButton && (
                <EditableSpan
                  defaultValue={selectedStream.state?.title || ''}
                  value={values.nameStream}
                  onChange={localHandlers.onChangeNameStreamHandler}
                  label={'Name of stream'}
                  customStyle={{ marginRight: '10px' }}
                  editable={
                    !meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted
                  }
                />
              )}
            <ButtonRequest
              variant="contained"
              onClick={() => {
                handlers.getConfirmHandler('start');
              }}
              disabled={localHandlers.checkForDisableStartButton(
                streamRequestIsRunning,
                withNameOfStream
              )}
              requestStatus={requestStatus}
              style={customButtonStyle}
              className={customButtonClassname}
              clearDisabledAfterClick={true}
            >
              {localHandlers.getStartButtonTitle(
                streamRequestIsRunning,
                !!selectedStream.state,
                title
              )}
            </ButtonRequest>
          </Block>
        )}
      </div>
    );
  }
);
