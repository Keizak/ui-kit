import React, { memo } from 'react';

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
  }: ActionButtonsPropsType) => {
    const { values, localHandlers } = useGetActionButtonsLogic({
      entityId,
      disabledCreateMeetingButton,
      selectedStream,
      handlers,
    });

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

        {streamIsNotStartedMeetingIsNotCreated && values.initialization && (
          <Block name={'NameAndButtonStartStreamContainer'}>
            {withNameOfStream && !disabledCreateMeetingButton && (
              <EditableSpan
                value={values.nameStream}
                onChange={localHandlers.onChangeNameStreamHandler}
                onSave={localHandlers.onSaveNameStreamHandler}
                label={'Name of stream'}
                customStyle={{ marginRight: '10px' }}
              />
            )}

            <ButtonRequest
              variant="contained"
              onClick={() => {
                handlers.getConfirmHandler('start');
              }}
              disabled={localHandlers.startStreamButtonCheckForDisable()}
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
