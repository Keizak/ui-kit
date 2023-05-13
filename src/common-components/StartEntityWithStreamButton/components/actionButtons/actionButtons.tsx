import React, { memo, useState } from 'react';

import EditableSpan from '../../../../ui-components/EditableSpan/EditableSpan';
import { Block } from '../../../../ui-styled-components';
import { ButtonRequest } from '../../../ButtonRequest/buttonRequest';
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
  }: ActionButtonsPropsType) => {
    const [nameStream, setNameStream] = useState('');

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
          <Block name={'NameAndButtonStartStreamContainer'}>
            {withNameOfStream && (
              <EditableSpan
                value={nameStream}
                onChange={(newTitle) => {
                  setNameStream(newTitle);
                  selectedStream.state &&
                    selectedStream.set({
                      ...selectedStream.state,
                      title: newTitle,
                    });
                }}
                onSave={(newTitle) => {
                  selectedStream.state &&
                    handlers.updateStream({
                      ...selectedStream.state,
                      title: newTitle,
                    });
                }}
                label={'Name of stream'}
                customStyle={{ marginRight: '10px' }}
              />
            )}

            <ButtonRequest
              variant="contained"
              onClick={() => {
                handlers.getConfirmHandler('start');
              }}
              disabled={disabledCreateMeetingButton && nameStream.length > 0}
              requestStatus={requestStatus}
              style={customButtonStyle}
              className={customButtonClassname}
              clearDisabledAfterClick={true}
            >
              {selectedStream.state
                ? title
                : `You don't have access to this type of streams`}
            </ButtonRequest>
          </Block>
        )}
      </div>
    );
  }
);
