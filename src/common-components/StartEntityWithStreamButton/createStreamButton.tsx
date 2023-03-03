import React, { useEffect, useState } from 'react';

import { RequestStatuses } from '../../helpers';
import { ButtonRequest } from '../ButtonRequest/buttonRequest';

import { IStream, StreamTypes } from './api/api';
import { useLocalHandlers } from './hooks/useLocalHandlers';
import { useMeetingLogic } from './hooks/useMeetingLogic';
import { useStreamsData } from './hooks/useStreamsData';
import { CreateSettingStreamModal } from './modals/CreateSettingStreamModal';
import { SettingStreamModal } from './modals/SettingStreamModal';
import { StartStopStreamButton } from './startStopStreamButton/startStopStreamButton';

export type createStreamButtonPropsType = {
  title?: string;
  entityTitle?: string;
  type: StreamTypes;
  streamStatus: boolean;
  setStreamStatus: (status: boolean) => void;
  userId: number;
  requestStatus: RequestStatuses;
};
export const StartEntityWithStreamButton = (
  props: createStreamButtonPropsType
) => {
  const {
    title = 'Create stream',
    entityTitle = 'stream',
    streamStatus,
    setStreamStatus,
    userId,
    requestStatus,
  } = props;

  const [selectedStream, setSelectedStream] = useState<IStream | null>(null);

  const { streams, setStreams, getStreamsForThisUser, updateStream } =
    useStreamsData({
      setSelectedStream,
      userId,
    });

  const { changeMeetingLogicState, meetingLogicState } = useMeetingLogic({
    setSelectedStream,
    selectedStream,
    updateStream,
  });

  const {
    changeStatusStream,
    createStreamHandler,
    clickSettingsHandler,
    clickStartStopStreamHandler,
  } = useLocalHandlers({
    changeMeetingLogicState,
    streamStatus,
    selectedStream,
    setSelectedStream,
    updateStream,
    toggleStreamStatus: () => setStreamStatus(!streamStatus),
    getStreams: () => {
      getStreamsForThisUser(userId).then((res) => setStreams(res));
    },
  });

  useEffect(() => {}, [selectedStream, streamStatus]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ marginBottom: '5px' }}>
        {meetingLogicState.meetingCreatingStatus}
      </div>
      {selectedStream && streamStatus && (
        <div style={{ marginBottom: '5px' }}>
          Стрим : {selectedStream.title}
        </div>
      )}

      <div>
        {(meetingLogicState.createMeeting && selectedStream) ||
        selectedStream?.startedStreamSession ? (
          <StartStopStreamButton
            selectedStream={selectedStream}
            streamStatus={streamStatus}
            entityTitle={entityTitle}
            clickSettingsHandler={clickSettingsHandler}
            clickStartStopStreamHandler={clickStartStopStreamHandler}
          />
        ) : (
          <ButtonRequest
            variant="contained"
            onClick={createStreamHandler}
            disabled={meetingLogicState.createMeetingLoading}
            requestStatus={requestStatus}
          >
            {title}
          </ButtonRequest>
        )}
      </div>

      <CreateSettingStreamModal
        onSubmit={(id, status) => changeStatusStream(id, status)}
        open={meetingLogicState.createMeetingStatusModal}
        setOpen={(value) =>
          changeMeetingLogicState('createMeetingStatusModal', value)
        }
        streams={streams}
        setStreamStatus={setStreamStatus}
        setMeetingCreatingStatus={(value) =>
          changeMeetingLogicState('meetingCreatingStatus', value)
        }
        setSelectedStream={setSelectedStream}
        selectedStream={selectedStream}
      />
      {selectedStream && (
        <SettingStreamModal
          onSubmit={() => updateStream(selectedStream.link, selectedStream)}
          open={meetingLogicState.settingsStreamStatusModal}
          setOpen={(value) =>
            changeMeetingLogicState('settingsStreamStatusModal', value)
          }
          setSelectedStream={setSelectedStream}
          selectedStream={selectedStream}
        />
      )}
    </div>
  );
};
