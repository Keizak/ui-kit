import {
  useCreateStreamButtonLogicParamsType,
  UseCreateStreamButtonLogicReturnType,
} from '../types';

import { useLocalHandlers } from './useLocalHandlers';
import { useMeetingLogic } from './useMeetingLogic';
import { useStreamsData } from './useStreamsData';
import { useStyleFunctions } from './useStyleFunctions';

export const useCreateStreamButtonLogic = ({
  type,
  userId,
  asyncHandler,
  onFinishCreateStream,
  onFinishStopStream,
  beforeStartStream,
}: useCreateStreamButtonLogicParamsType): UseCreateStreamButtonLogicReturnType => {
  //------------------------------------------------useStyleFunctions---------------------------------------------------

  const {
    getContainerStyle,
    getShowStatusForStatusesBlock,
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

  const { handlers, actionConfirmationData } =
    useLocalHandlers(localHandlersParams);

  return {
    styleFunctions: {
      getContainerStyle,
      getShowStatusForStatusesBlock,
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
    actionConfirmationData,
  };
};
