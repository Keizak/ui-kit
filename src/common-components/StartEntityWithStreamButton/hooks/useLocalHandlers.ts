import { axiosInstance, IStream } from '../api/api';

type useLocalHandlersParamsType = {
  changeMeetingLogicState: (fields: Record<string, any>) => void;
  selectedStream: IStream | null;
  setSelectedStream: (stream: IStream) => void;
  updateStream: (link: string, currentStream: IStream) => Promise<void>;
  getStreams: () => void;
};
export const useLocalHandlers = ({
  changeMeetingLogicState,
  selectedStream,
  updateStream,
  setSelectedStream,
  getStreams,
}: useLocalHandlersParamsType) => {
  const toggleSelectedStreamStatus = () => {
    if (selectedStream)
      return setSelectedStream({
        ...selectedStream,
        startedStreamSession: !selectedStream.startedStreamSession,
      });
    else return null;
  };
  const changeStatusStream = async (streamId: number, status: boolean) => {
    changeMeetingLogicState({ meetingCreatingStatus: '' });
    if (status) {
      return await axiosInstance.put(`streams/${streamId}/stop`).then((res) => {
        if (res.status === 200 && res.data?.resultCode === 0) {
          toggleSelectedStreamStatus();
          changeMeetingLogicState({ createMeeting: false });
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
            toggleSelectedStreamStatus();
            changeMeetingLogicState({
              createMeeting: true,
              createMeetingStatusModal: false,
            });
            if (selectedStream) {
              updateStream(selectedStream.link, selectedStream);
            }
          }
        });
    }
  };
  const createStreamHandler = () => {
    changeMeetingLogicState({ createMeetingStatusModal: true });
  };

  const clickSettingsHandler = () => {
    changeMeetingLogicState({ settingsStreamStatusModal: true });
  };

  const clickStartStopStreamHandler = () => {
    selectedStream &&
      changeStatusStream(
        selectedStream?.id,
        !!selectedStream.startedStreamSession
      );
  };

  return {
    changeStatusStream,
    createStreamHandler,
    clickSettingsHandler,
    clickStartStopStreamHandler,
  };
};
