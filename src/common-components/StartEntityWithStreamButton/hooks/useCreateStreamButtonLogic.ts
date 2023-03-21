import { StreamTypes } from '../api/api';

import { useLocalHandlers } from './useLocalHandlers';
import { useMeetingLogic } from './useMeetingLogic';
import { useStreamsData } from './useStreamsData';
import { useStyleFunctions } from './useStyleFunctions';

type useCreateStreamButtonLogicParamsType = {
  type: StreamTypes;
  userId: number;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
};
export const useCreateStreamButtonLogic = ({
  type,
  userId,
  asyncHandler,
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
