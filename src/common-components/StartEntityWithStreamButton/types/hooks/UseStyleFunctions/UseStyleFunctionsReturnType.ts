import React from 'react';

import { IStream } from '../../api';

import { StatusesPositionType } from './StatusesPositionType';

export type UseStyleFunctionsReturnType = {
  getDisabledStartStreamButton: (
    meetingLoading: boolean,
    selectedStream: IStream | null
  ) => boolean;
  getContainerStyle: (
    statusPosition: StatusesPositionType
  ) => React.CSSProperties;
  getShowStatusForStatusesBlock: (
    position: 'bottom' | 'top',
    statusPosition: StatusesPositionType,
    meetingCreatingStatus: boolean
  ) => boolean;
};
