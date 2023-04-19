import { useCallback, useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import { supportBookingAPI } from '../api';
import { useMeetingLogicParamsType, UseMeetingLogicReturnType } from '../types';

import { useMeetingHandlers } from './useMeetingHandlers';

export const useMeetingLogic = (
  params: useMeetingLogicParamsType
): UseMeetingLogicReturnType => {
  // Деструктуризируем параметры встречи
  const { selectedStream } = params;

  // Инициализируем хранилище Redux для отправки действий
  const dispatch = useDispatch();

  // Инициализируем состояния для модального окна статуса потока, статуса создания встречи, флага создания встречи, флага загрузки создания встречи и флага ошибки создания встречи
  const [settingsStreamStatusModal, setSettingsStreamStatusModal] =
    useState(false);
  const [meetingCreatingStatus, setMeetingCreatingStatus] =
    useState<string>('');
  const [createMeeting, setCreateMeeting] = useState(false);
  const [createMeetingLoading, setCreateMeetingLoading] = useState(false);
  const [createMeetingError, setCreateMeetingError] = useState(false);

  // Инициализируем объект состояния для передачи возвращаемого значения
  const meetingLogicState = {
    settingsStreamStatusModal,
    meetingCreatingStatus,
    createMeetingLoading,
    createMeeting,
    createMeetingError,
  };

  // Определяем функцию для изменения состояний
  const changeMeetingLogicState = useCallback((fields: Record<string, any>) => {
    Object.keys(fields).forEach((key) => {
      switch (key) {
        case 'settingsStreamStatusModal':
          return setSettingsStreamStatusModal(fields[key]);
        case 'meetingCreatingStatus':
          return setMeetingCreatingStatus(fields[key]);
        case 'createMeeting':
          return setCreateMeeting(fields[key]);
        case 'createMeetingLoading':
          return setCreateMeetingLoading(fields[key]);
        case 'createMeetingError':
          return setCreateMeetingError(fields[key]);
        default:
          break;
      }
    });
  }, []);

  // Получаем обработчики событий встречи с помощью хука useMeetingHandlers
  const {
    handleCreateSessionInformation,
    handleSessionStarted,
    handleSessionFinished,
    handleSessionFailed,
  } = useMeetingHandlers({
    ...params,
    changeMeetingLogicState,
  });

  // Запускаем эффект, который подписывается на события с бэкэнда
  useEffect(() => {
    if (selectedStream.state) {
      // Открываем соединение с бэкэндом
      supportBookingAPI.open().finally(() => {
        const connection = supportBookingAPI.checkConnection();

        if (!connection) {
          // Если связь с бэкэндом не установлена, отправляем действие с ошибкой
          dispatch({
            type: 'SHOW_ERROR',
            payload: 'Связь с сокетом не установлена',
          });
        }
      });

      // Подписываемся на события с бэкэнда
      supportBookingAPI.subscribe(
        'ZOOM-SERVICE-API/CREATE-SESSION-INFORMATION',
        handleCreateSessionInformation
      );
      supportBookingAPI.subscribe(
        'ZOOM-SERVICE-API/SESSION_STARTED',
        handleSessionStarted
      );
      supportBookingAPI.subscribe(
        'ZOOM-SERVICE-API/SESSION_FINISHED',
        handleSessionFinished
      );
      supportBookingAPI.subscribe(
        'ZOOM-SERVICE-API/SESSION_FAILED',
        handleSessionFailed
      );
    }

    // Возвращаем функцию очистки, которая закрывает соединение с бэкэндом
    return () => {
      if (selectedStream.state) {
        supportBookingAPI.close().finally();
      }
    };
  }, [selectedStream.state]);

  return {
    changeMeetingLogicState,
    meetingLogicState: meetingLogicState,
  };
};
