import { useEffect, useState } from 'react';

import { supportBookingAPI } from '../api';
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
  showError,
                                             beforeStartStreamError
}: useCreateStreamButtonLogicParamsType): UseCreateStreamButtonLogicReturnType => {
  //-----------------------------------------------------useState-------------------------------------------------------

  const [localLoading, setLocalLoading] = useState(true);

  const [clickStartStopStreamHandler, setClickStartStopStreamHandler] =
    useState<{ status: 'mock' | 'real'; func: () => void }>({
      status: 'mock',
      func: () => {
        console.log('mock');
      },
    });

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
    setLocalLoading,
  };

  const { streamsApi, selectedStream, loading, streamRequestIsRunning } =
    useStreamsData(streamsDataParams);

  //-------------------------------------------------useMeetingLogic----------------------------------------------------

  const meetingLogicParams = {
    selectedStream,
    streamsApi,
    clickStartStopStreamHandler,
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
    showError,
    setClickStartStopStreamHandler,
    beforeStartStreamError
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
      clearTimeout(timeout);
      supportBookingAPI.close().finally();
    };
  }, []);

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
      streamRequestIsRunning,
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
