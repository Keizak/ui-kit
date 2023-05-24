import { CSSProperties, useCallback } from 'react';

import {
  IStream,
  StatusesPositionType,
  UseStyleFunctionsReturnType,
} from '../types';

export const useStyleFunctions = (): UseStyleFunctionsReturnType => {
  // Функция для получения состояния кнопки "Start Stream"
  const getDisabledStartStreamButton = useCallback(
    (meetingLoading: boolean, selectedStream: IStream | null) => {
      let disabled = false;

      console.log(meetingLoading, 'meetingLoading');
      console.log(selectedStream, 'selectedStream');

      // Если не выбран поток, то кнопка должна быть заблокирована
      if (!selectedStream) disabled = true;
      // Если идет создание встречи, то кнопка должна быть заблокирована
      if (meetingLoading) disabled = true;

      return disabled;
    },
    []
  );

  // Функция для получения стилей контейнера
  const getContainerStyle = useCallback(
    (statusPosition: StatusesPositionType): CSSProperties => {
      const defaultStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      // Если статусы расположены справа или слева, то контейнер должен быть по умолчанию
      if (statusPosition === 'right' || statusPosition === 'left')
        return defaultStyle;
      // Если статусы расположены внизу, то контейнер должен быть с колонкой и выравниванием влево
      if (statusPosition === 'bottom')
        return {
          ...defaultStyle,
          flexDirection: 'column',
          alignItems: 'flex-start',
        };
      // Если статусы расположены сверху, то контейнер должен быть с колонкой
      else return { ...defaultStyle, flexDirection: 'column' };
    },
    []
  );

  // Функция для получения позиции статусного блока
  const getPositionStatusBlock = (
    statusPosition: StatusesPositionType
  ): 'top' | 'bottom' => {
    // Если статусы расположены слева или сверху, то позиция блока должна быть сверху
    if (statusPosition === 'left' || statusPosition === 'top') return 'top';
    // Если статусы расположены справа или внизу, то позиция блока должна быть внизу
    else return 'bottom';
  };

  // Функция для получения флага, показывающего статусы для блока статусов
  const getShowStatusForStatusesBlock = useCallback(
    (
      position: 'bottom' | 'top',
      statusPosition: StatusesPositionType,
      meetingCreatingStatus: boolean
    ): boolean => {
      // Если позиция блока совпадает с позицией статусов и идет создание встречи, то флаг должен быть true
      return (
        getPositionStatusBlock(statusPosition) === position &&
        meetingCreatingStatus
      );
    },
    []
  );

  return {
    getDisabledStartStreamButton,
    getContainerStyle,
    getShowStatusForStatusesBlock,
  };
};
