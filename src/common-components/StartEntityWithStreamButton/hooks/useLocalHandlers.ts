import { axiosInstance, IStream } from '../api/api';

import { meetingLogicStateKeysType } from './useMeetingLogic';

type useLocalHandlersParamsType = {
  changeMeetingLogicState: (
    fields: meetingLogicStateKeysType | meetingLogicStateKeysType[],
    value: any
  ) => void;
  streamStatus: boolean;
  selectedStream: IStream | null;
  setSelectedStream: (stream: IStream) => void;
  updateStream: (link: string, currentStream: IStream) => Promise<void>;
  toggleStreamStatus: () => void;
  getStreams: () => void;
};
export const useLocalHandlers = ({
  changeMeetingLogicState,
  streamStatus,
  selectedStream,
  updateStream,
  setSelectedStream,
  toggleStreamStatus,
  getStreams,
}: useLocalHandlersParamsType) => {
  const changeStatusStream = async (streamId: number, status: boolean) => {
    changeMeetingLogicState('meetingCreatingStatus', '');
    if (status) {
      return await axiosInstance.put(`streams/${streamId}/stop`).then((res) => {
        if (res.status === 200 && res.data?.resultCode === 0) {
          toggleStreamStatus();
          changeMeetingLogicState('createMeeting', false);
          if (selectedStream) {
            updateStream('', selectedStream);
            setSelectedStream({
              ...selectedStream,
              startedStreamSession: false,
            });
          }
          getStreams();
        }
      });
    } else {
      return await axiosInstance
        .put(`streams/${streamId}/start`)
        .then((res) => {
          if (res.status === 200 && res.data?.resultCode === 0) {
            toggleStreamStatus();
            changeMeetingLogicState(
              ['createMeeting', 'createMeetingStatusModal'],
              [true, false]
            );
            if (selectedStream) {
              updateStream(selectedStream.link, selectedStream);
            }
          }
        });
    }
  };
  const createStreamHandler = () => {
    changeMeetingLogicState('createMeetingStatusModal', true);
  };

  const clickSettingsHandler = () => {
    changeMeetingLogicState('settingsStreamStatusModal', true);
  };

  const clickStartStopStreamHandler = () => {
    selectedStream && changeStatusStream(selectedStream?.id, streamStatus);
  };

  return {
    changeStatusStream,
    createStreamHandler,
    clickSettingsHandler,
    clickStartStopStreamHandler,
  };
};
