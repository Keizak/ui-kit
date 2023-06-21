import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { streamsAPI } from '../api';
import {
  IStream,
  useLocalHandlersParamsType,
  useLocalHandlersReturnType,
} from '../types';

export const useLocalHandlers = ({
  changeMeetingLogicState,
  selectedStream,
  streamsApi,
  asyncHandler,
  createMeetingStatus,
  onFinishCreateStream,
  onFinishStopStream,
  beforeStartStream,
  setClickStartStopStreamHandler,
  showError,
                                   beforeStartStreamError
}: useLocalHandlersParamsType): useLocalHandlersReturnType => {
  const dispatch = useDispatch();

  const [actionConfirmationStatus, setActionConfirmationStatus] =
    useState(false);

  const [currentAction, setCurrentAction] = useState<'start' | 'stop' | null>(
    null
  );

  const toggleSelectedStreamStatus = () => {
    if (selectedStream.state)
      return selectedStream.set({
        ...selectedStream.state,
        startedStreamSession: !selectedStream.state.startedStreamSession,
      });
    else return null;
  };

  const updateStream = (newStream: IStream | null | undefined) => {
    newStream && streamsApi.updateStream(newStream);
  };
  const changeStatusStream = async (streamId: number, status: boolean) => {
    changeMeetingLogicState({ meetingCreatingStatus: '' });
    if (status) {
      return await asyncHandler(() =>
        streamsApi.withStreamRequestIsRunningStatus(() =>
          streamsAPI.stop(streamId).then((res) => {
            if (res.resultCode === 0) {
              toggleSelectedStreamStatus();
              changeMeetingLogicState({ createMeeting: false });
              if (selectedStream.state) {
                updateStream({ ...selectedStream.state, link: '' });
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
        )
      );
    } else {
      return await asyncHandler(() =>
        streamsApi.withStreamRequestIsRunningStatus(() =>
          streamsAPI.start(streamId).then((res) => {
            if (res.resultCode === 0) {
              toggleSelectedStreamStatus();
              changeMeetingLogicState({
                createMeetingStatusModal: false,
              });
              // if (selectedStream.state) {
              //   streamsApi.updateStream(selectedStream.state);
              // }
            }

            return res;
          })
        )
      );
    }
  };

  const createStreamHandler = useCallback(() => {
    changeMeetingLogicState({ createMeetingStatusModal: true });
  }, []);

  const clickSettingsHandler = useCallback(() => {
    changeMeetingLogicState({ settingsStreamStatusModal: true });
  }, []);

  const clickStartStopStreamHandler = () => {
    selectedStream.state &&
      changeStatusStream(
        selectedStream.state?.id,
        !!selectedStream.state.startedStreamSession
      );
  };

  const stopStreamHandler = () => {
    if (selectedStream.state && selectedStream.state.startedStreamSession)
      changeStatusStream(selectedStream.state?.id, true);
    else return;
  };

  const createMeeting = async () => {
    const res = await asyncHandler(() =>
      selectedStream.state
        ? streamsAPI.createMeeting(selectedStream.state.id)
        : new Promise((resolve) => resolve(null))
    );

    if (res.errors.length > 0)
      showError(
        res.errors.map(
          (error: { field: string; message: string }) => error.message
        )
      );

    return res;
  };

  const chooseText = useCallback(
    (currentAction: 'start' | 'stop' | null, entityTitle: string) => {
      switch (currentAction) {
        case 'start':
          return `
              Потверждая данное действие, автоматически запустится
              зум-конференция и ${entityTitle}-сессия.
                `;
        case 'stop':
          return `Потверждая данное действие, автоматически выключается ${entityTitle}-сессия, но не завершается зум-конференция.
          Пожалуйста не забудь её закрыть!`;
        default:
          return '';
      }
    },
    []
  );

  const actionConfirmationHandler = async (action: 'start' | 'stop' | null) => {

    if (action === 'start') {
      if (beforeStartStream && selectedStream.state) {
        const resultBeforeStartStream = await beforeStartStream(selectedStream.state, selectedStream.set)
        if (resultBeforeStartStream === null)
          return showError(beforeStartStreamError)
      }
      createMeeting().finally();
    }
    if (action === 'stop') clickStartStopStreamHandler();

    return setTimeout(() => setCurrentAction(null), 1000);
  };

  const getConfirmHandler = useCallback((action: 'start' | 'stop') => {
    setCurrentAction(action);
    setActionConfirmationStatus(true);
  }, []);

  useEffect(() => {
    if (createMeetingStatus)
      try {
        changeStatusStream(
          selectedStream.state?.id ? selectedStream.state?.id : NaN,
          false
        ).finally();
        onFinishCreateStream && onFinishCreateStream();
      } catch (e) {
        const error = e as Error; // приводим объект к типу Error

        dispatch({ type: 'SHOW_ERROR', payload: error.message });
      }
  }, [createMeetingStatus]);

  useEffect(() => {
    if (selectedStream.state)
      setClickStartStopStreamHandler({
        func: stopStreamHandler,
        status: 'real',
      });
  }, [selectedStream.state]);

  return {
    handlers: {
      updateStream,
      changeStatusStream,
      createStreamHandler,
      clickSettingsHandler,
      clickStartStopStreamHandler,
      createMeeting,
      chooseText,
      getConfirmHandler,
      actionConfirmationHandler,
    },
    actionConfirmationData: {
      actionConfirmationStatus: {
        state: actionConfirmationStatus,
        set: setActionConfirmationStatus,
      },
      currentAction,
    },
  };
};
