import { useMutation } from 'react-query';

import { IStream, streamsAPI } from '../api/api';

type useLocalHandlersParamsType = {
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
};
export const useLocalHandlers = ({
  changeMeetingLogicState,
  selectedStream,
  streamsApi,
  asyncHandler,
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
          }

          return res;
        })
      );
    } else {
      return await asyncHandler(() =>
        streamsAPI.start(streamId).then((res) => {
          if (res.resultCode === 0) {
            toggleSelectedStreamStatus();
            changeMeetingLogicState({
              createMeeting: true,
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
      onSuccess: () => {
        changeStatusStream(
          selectedStream.state?.id ? selectedStream.state?.id : NaN,
          false
        ).finally();
      },
      onError: (error) => {
        console.error(error, 'error');
      },
    }
  );

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
