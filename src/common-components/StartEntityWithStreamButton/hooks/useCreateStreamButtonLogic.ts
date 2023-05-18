import { useEffect, useState } from 'react';

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
  //-----------------------------------------------------useState-------------------------------------------------------

  const [localLoading, setLocalLoading] = useState(true);

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
    streamsApi,
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

  //------------------------------------------------------useEffect-----------------------------------------------------

  let timeout: any = 0;

  useEffect(() => {
    timeout = setTimeout(() => {
      setLocalLoading(false);
    }, 1000);

    return () => {
      console.log('clearTimeout');
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    console.log(localLoading, 'localLoading');
  }, [localLoading]);

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
    localLoading: {
      state: localLoading,
      set: setLocalLoading,
    },
    handlers,
    actionConfirmationData,
  };
};
