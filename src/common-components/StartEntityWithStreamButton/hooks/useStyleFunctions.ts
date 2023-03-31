import { CSSProperties, useCallback } from 'react';

import {
  IStream,
  StatusesPositionType,
  UseStyleFunctionsReturnType,
} from '../types';

export const useStyleFunctions = (): UseStyleFunctionsReturnType => {
  const getDisabledStartStreamButton = useCallback(
    (meetingLoading: boolean, selectedStream: IStream | null) => {
      let disabled = false;

      if (!selectedStream) disabled = true;
      if (meetingLoading) disabled = true;

      return disabled;
    },
    []
  );

  const getContainerStyle = useCallback(
    (statusPosition: StatusesPositionType): CSSProperties => {
      const defaultStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      };

      if (statusPosition === 'right' || statusPosition === 'left')
        return defaultStyle;
      if (statusPosition === 'bottom')
        return {
          ...defaultStyle,
          flexDirection: 'column',
          alignItems: 'flex-start',
        };
      else return { ...defaultStyle, flexDirection: 'column' };
    },
    []
  );

  const getPositionStatusBlock = (
    statusPosition: StatusesPositionType
  ): 'top' | 'bottom' => {
    if (statusPosition === 'left' || statusPosition === 'top') return 'top';
    else return 'bottom';
  };

  const getShowStatusForStatusesBlock = useCallback(
    (
      position: 'bottom' | 'top',
      statusPosition: StatusesPositionType,
      meetingCreatingStatus: boolean
    ): boolean => {
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
