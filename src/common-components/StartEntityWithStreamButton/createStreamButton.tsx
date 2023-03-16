import React, { useState } from 'react';

import { useMutation } from 'react-query';

import { RequestStatuses } from '../../helpers';
import { ButtonRequest } from '../ButtonRequest/buttonRequest';

import { IStream, streamsAPI, StreamTypes } from './api/api';
import { useLocalHandlers } from './hooks/useLocalHandlers';
import { useMeetingLogic } from './hooks/useMeetingLogic';
import { useStreamsData } from './hooks/useStreamsData';
import { SettingStreamModal } from './modals/SettingStreamModal';
import { StartStopStreamButton } from './startStopStreamButton/startStopStreamButton';

export type createStreamButtonPropsType = {
  title?: string;
  entityTitle?: string;
  type: StreamTypes;
  userId: number;
  requestStatus: RequestStatuses;
};
export const StartEntityWithStreamButton = (
  props: createStreamButtonPropsType
) => {
  const {
    title = 'Create Zoom-meeting',
    entityTitle = 'stream',
    userId,
    requestStatus,
    type,
  } = props;

  const [selectedStream, setSelectedStream] = useState<IStream | null>(null);

  const { setStreams, getStreamsWithNeededTypeForThisUser, updateStream } =
    useStreamsData({
      type,
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
    clickSettingsHandler,
    clickStartStopStreamHandler,
  } = useLocalHandlers({
    changeMeetingLogicState,
    selectedStream,
    setSelectedStream,
    updateStream,
    getStreams: () => {
      getStreamsWithNeededTypeForThisUser(userId, type).then((res) =>
        setStreams(res)
      );
    },
  });

  const createMeeting = useMutation<any, any, {}, any>(
    () => {
      if (selectedStream) return streamsAPI.createMeeting(selectedStream.id);
      else return new Promise((resolve) => resolve(null));
    },
    {
      onSuccess: () => {
        changeStatusStream(
          selectedStream?.id ? selectedStream?.id : NaN,
          false
        ).finally();
      },
      onError: (error) => {
        console.error(error, 'error');
      },
    }
  );

  const getDisabledStartStreamButton = (
    meetingLoading: boolean,
    selectedStream: IStream | null
  ) => {
    let disabled = false;

    if (!selectedStream) disabled = true;
    if (meetingLoading) disabled = true;

    return disabled;
  };

  //
  // useEffect(() => {
  //   console.log(meetingLogicState, 'meetingLogicState');
  // }, [meetingLogicState]);

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div style={{ marginBottom: '5px' }}>
        {meetingLogicState.meetingCreatingStatus}
      </div>
      {selectedStream && selectedStream.startedStreamSession && (
        <div style={{ marginBottom: '5px' }}>
          Стрим : {selectedStream.title}
        </div>
      )}
      <div>
        {(meetingLogicState.createMeeting && selectedStream) ||
        selectedStream?.startedStreamSession ? (
          <StartStopStreamButton
            selectedStream={selectedStream}
            entityTitle={entityTitle}
            clickSettingsHandler={clickSettingsHandler}
            clickStartStopStreamHandler={clickStartStopStreamHandler}
          />
        ) : (
          <ButtonRequest
            variant="contained"
            onClick={() => {
              createMeeting.mutateAsync({}).finally();
            }}
            disabled={getDisabledStartStreamButton(
              meetingLogicState.createMeetingLoading,
              selectedStream
            )}
            requestStatus={requestStatus}
          >
            {title}
          </ButtonRequest>
        )}
      </div>
      {/*<CreateSettingStreamModal*/}
      {/*  onSubmit={(id, status) => changeStatusStream(id, status)}*/}
      {/*  open={meetingLogicState.createMeetingStatusModal}*/}
      {/*  setOpen={(value) =>*/}
      {/*    changeMeetingLogicState('createMeetingStatusModal', value)*/}
      {/*  }*/}
      {/*  streams={streams}*/}
      {/*  setStreamStatus={setStreamStatus}*/}
      {/*  setMeetingCreatingStatus={(value) =>*/}
      {/*    changeMeetingLogicState('meetingCreatingStatus', value)*/}
      {/*  }*/}
      {/*  setSelectedStream={setSelectedStream}*/}
      {/*  selectedStream={selectedStream}*/}
      {/*/>*/}
      {selectedStream && (
        <SettingStreamModal
          open={meetingLogicState.settingsStreamStatusModal}
          setOpen={(value) =>
            changeMeetingLogicState({ settingsStreamStatusModal: value })
          }
          selectedStream={selectedStream}
        />
      )}
    </div>
  );
};
