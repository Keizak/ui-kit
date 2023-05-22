import { useCallback, useEffect, useState } from 'react';

import { useMutation } from 'react-query';
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
      );
    } else {
      beforeStartStream &&
        selectedStream.state &&
        (await beforeStartStream(selectedStream.state, selectedStream.set));

      return await asyncHandler(() =>
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

  const createMeeting = useMutation<any, any, {}, any>(
    async () => {
      return await asyncHandler(() =>
        selectedStream.state
          ? streamsAPI.createMeeting(selectedStream.state.id)
          : new Promise((resolve) => resolve(null))
      );
    },
    {
      onError: (error) => {
        console.error(error, 'error');
      },
    }
  );

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

  const actionConfirmationHandler = (action: 'start' | 'stop' | null) => {
    if (action === 'start') createMeeting.mutateAsync({}).finally();
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
