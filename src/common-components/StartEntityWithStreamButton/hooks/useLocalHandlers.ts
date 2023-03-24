import { useEffect } from 'react';

import { useMutation } from 'react-query';

import { IStream, streamsAPI } from '../api/api';

type useLocalHandlersParamsType = {
  createMeetingStatus: boolean;
  changeMeetingLogicState: (fields: Record<string, any>) => void;
  selectedStream: {
    set: (stream: IStream) => void;
    state: IStream | null;
  };
  streamsApi: {
    updateStream: (newStream: IStream) => any;
    getStreams: () => void;
  };
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (selectedStream: IStream) => Promise<any>;
};
export const useLocalHandlers = ({
  changeMeetingLogicState,
  selectedStream,
  streamsApi,
  asyncHandler,
  createMeetingStatus,
  onFinishCreateStream,
  onFinishStopStream,
  beforeStartStream,
}: useLocalHandlersParamsType) => {
  const toggleSelectedStreamStatus = () => {
    if (selectedStream.state)
      return selectedStream.set({
        ...selectedStream.state,
        startedStreamSession: !selectedStream.state.startedStreamSession,
      });
    else return null;
  };
  const changeStatusStream = async (streamId: number, status: boolean) => {
    changeMeetingLogicState({ meetingCreatingStatus: '' });
    if (status) {
      return await asyncHandler(() =>
        streamsAPI.stop(streamId).then((res) => {
          if (res.resultCode === 0) {
            toggleSelectedStreamStatus();
            changeMeetingLogicState({ createMeeting: false });
            if (selectedStream.state) {
              streamsApi.updateStream({ ...selectedStream.state, link: '' });
              selectedStream.set({
                ...selectedStream.state,
                startedStreamSession: false,
              });
            }
            streamsApi.getStreams();
            onFinishStopStream && onFinishStopStream();
          }

          return res;
        })
      );
    } else {
      beforeStartStream &&
        selectedStream.state &&
        (await beforeStartStream(selectedStream.state));

      return await asyncHandler(() =>
        streamsAPI.start(streamId).then((res) => {
          if (res.resultCode === 0) {
            toggleSelectedStreamStatus();
            changeMeetingLogicState({
              createMeetingStatusModal: false,
            });
            if (selectedStream.state) {
              streamsApi.updateStream(selectedStream.state);
            }
          }

          return res;
        })
      );
    }
  };
  const createStreamHandler = () => {
    changeMeetingLogicState({ createMeetingStatusModal: true });
  };

  const clickSettingsHandler = () => {
    changeMeetingLogicState({ settingsStreamStatusModal: true });
  };

  const clickStartStopStreamHandler = () => {
    selectedStream.state &&
      changeStatusStream(
        selectedStream.state?.id,
        !!selectedStream.state.startedStreamSession
      );
  };

  const createMeeting = useMutation<any, any, {}, any>(
    () => {
      if (selectedStream.state)
        return streamsAPI.createMeeting(selectedStream.state.id);
      else return new Promise((resolve) => resolve(null));
    },
    {
      onError: (error) => {
        console.error(error, 'error');
      },
    }
  );

  useEffect(() => {
    if (createMeetingStatus)
      try {
        changeStatusStream(
          selectedStream.state?.id ? selectedStream.state?.id : NaN,
          false
        ).finally();
        onFinishCreateStream && onFinishCreateStream();
      } catch (e) {
        console.log();
      }
  }, [createMeetingStatus]);

  return {
    handlers: {
      changeStatusStream,
      createStreamHandler,
      clickSettingsHandler,
      clickStartStopStreamHandler,
      createMeeting,
    },
  };
};
