import { useCallback } from 'react';

import {
  CREATE_SESSION_INFORMATION_EventType,
  SESSION_FAILED_EventType,
  SESSION_STARTED_EventType,
} from '../types';
import { useMeetingHandlersParams } from '../types/hooks/useMeetingHandlers/useMeetingHandlersParams';
import { useMeetingHandlersReturnParamsType } from '../types/hooks/useMeetingHandlers/useMeetingHandlersReturnParamsType';

export const useMeetingHandlers = ({
  changeMeetingLogicState,
  selectedStream,
  streamsApi,
}: useMeetingHandlersParams): useMeetingHandlersReturnParamsType => {
  // Функция handleCreateSessionInformation задается через useCallback и обрабатывает событие типа CREATE_SESSION_INFORMATION_EventType
  const handleCreateSessionInformation = useCallback(
    ({ data }: CREATE_SESSION_INFORMATION_EventType) => {
      changeMeetingLogicState({
        meetingCreatingStatus: data.message,
        createMeetingLoading: true,
      });
    },
    []
  );

  // Функция handleSessionStarted задается через useCallback и обрабатывает событие типа SESSION_STARTED_EventType
  const handleSessionStarted = useCallback(
    ({ data }: SESSION_STARTED_EventType) => {
      // Если у выбранного потока (selectedStream) есть состояние (state),
      // то создается новый поток (changedStream) с обновленной ссылкой (link),
      // которая берется из свойства registration_url объекта data.meeting. Если свойство registration_url равно null или undefined,
      // то ссылка устанавливается на строку 'None'.
      if (selectedStream.state) {
        const changedStream = {
          ...selectedStream.state,
          link: data.meeting.registration_url ?? 'None',
        };

        // Обновляем состояние выбранного потока и отправляем обновленный поток на сервер
        selectedStream.set(changedStream);
        streamsApi.updateStream(changedStream);
      }

      // Обновляем состояние приложения, указывая,
      // что создание встречи (createMeeting) завершено,
      // загрузка (createMeetingLoading) закончилась и сообщение о создании встречи (meetingCreatingStatus) очищается
      changeMeetingLogicState({
        createMeeting: true,
        createMeetingLoading: false,
        meetingCreatingStatus: '',
      });
    },
    [selectedStream.state]
  );

  const handleMeetingFinished = useCallback(() => {
    changeMeetingLogicState({
      createMeeting: false,
      meetingCreatingStatus: '',
      createMeetingLoading: false,
      createMeetingError: false,
    });
  }, []);

  // Функция handleSessionFinished задается через useCallback и обрабатывает событие окончания сессии
  const handleSessionFinished = useCallback(() => {
    // Обновляем состояние приложения, указывая, что создание встречи (createMeeting) не происходит, загрузка (createMeetingLoading) закончилась и ошибка (createMeetingError) отсутствует
    changeMeetingLogicState({
      createMeeting: false,
      meetingCreatingStatus: '',
      createMeetingLoading: false,
      createMeetingError: false,
    });

    // Останавливаем поток на сервере и обновляем список потоков
    streamsApi.stopStream(selectedStream.state?.id ?? NaN).then((res) => {
      if (res.resultCode === 0 && selectedStream.state)
        selectedStream.set({
          ...selectedStream.state,
          startedStreamSession: false,
        });
    });
  }, [selectedStream.state]);

  // Функция handleSessionFailed задается через useCallback и обрабатывает событие типа SESSION_FAILED_EventType
  const handleSessionFailed = useCallback(
    ({ data }: SESSION_FAILED_EventType) => {
      // Обновляем состояние приложения, указывая сообщение (meetingCreatingStatus) об ошибке и флаг ошибки (createMeetingError)
      changeMeetingLogicState({
        meetingCreatingStatus: data.message ?? '',
        createMeetingError: true,
      });
    },
    []
  );

  // Функция возвращает объект с четырьмя свойствами, каждое из которых является функцией с соответствующим типом аргумента
  return {
    handleCreateSessionInformation,
    handleSessionStarted,
    handleSessionFinished,
    handleSessionFailed,
    handleMeetingFinished,
  };
};
