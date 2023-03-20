import { CSSProperties } from 'react';

import { IStream } from '../api/api';

export type StatusesPositionType = 'top' | 'right' | 'left' | 'bottom';
export const useStyleFunctions = () => {
  const getDisabledStartStreamButton = (
    meetingLoading: boolean,
    selectedStream: IStream | null
  ) => {
    let disabled = false;

    if (!selectedStream) disabled = true;
    if (meetingLoading) disabled = true;

    return disabled;
  };

  const getContainerStyle = (
    statusPosition: StatusesPositionType
  ): CSSProperties => {
    const defaultStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };

    if (statusPosition === 'right' || statusPosition === 'left')
      return defaultStyle;
    else return { ...defaultStyle, flexDirection: 'column' };
  };

  const getPositionStatusBlock = (statusPosition: StatusesPositionType) => {
    if (statusPosition === 'left' || statusPosition === 'top') return 'top';
    else return 'bottom';
  };

  return {
    getDisabledStartStreamButton,
    getContainerStyle,
    getPositionStatusBlock,
  };
};
