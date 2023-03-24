import { IStream, StreamTypes } from '../api/api';

import { useLocalHandlers } from './useLocalHandlers';
import { useMeetingLogic } from './useMeetingLogic';
import { useStreamsData } from './useStreamsData';
import { useStyleFunctions } from './useStyleFunctions';

type useCreateStreamButtonLogicParamsType = {
  type: StreamTypes | StreamTypes[];
  userId: number;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;
  beforeStartStream?: (selectedStream: IStream) => Promise<any>;
};
export const useCreateStreamButtonLogic = ({
  type,
  userId,
  asyncHandler,
  onFinishCreateStream,
  onFinishStopStream,
  beforeStartStream,
}: useCreateStreamButtonLogicParamsType) => {
  //------------------------------------------------useStyleFunctions---------------------------------------------------

  const {
    getContainerStyle,
    getPositionStatusBlock,
    getDisabledStartStreamButton,
  } = useStyleFunctions();

  //-------------------------------------------------useStreamsData-----------------------------------------------------

  const streamsDataParams = {
    type,
    userId,
  };

  const { streamsApi, selectedStream, loading } =
    useStreamsData(streamsDataParams);

  //-------------------------------------------------useMeetingLogic----------------------------------------------------

  const meetingLogicParams = {
    selectedStream,
    updateStream: streamsApi.updateStream,
  };

  const { changeMeetingLogicState, meetingLogicState } =
    useMeetingLogic(meetingLogicParams);

  //-------------------------------------------------useLocalHandlers---------------------------------------------------
  const localHandlersParams = {
    createMeetingStatus: meetingLogicState.createMeeting,
    changeMeetingLogicState,
    asyncHandler,
    selectedStream,
    streamsApi,
    onFinishCreateStream,
    onFinishStopStream,
    beforeStartStream,
  };

  const { handlers } = useLocalHandlers(localHandlersParams);

  return {
    styleFunctions: {
      getContainerStyle,
      getPositionStatusBlock,
      getDisabledStartStreamButton,
    },
    streamData: {
      streamsApi,
      selectedStream,
      loading,
    },
    meetingsData: {
      meetingLogicState,
      changeMeetingLogicState,
    },
    handlers,
  };
};
