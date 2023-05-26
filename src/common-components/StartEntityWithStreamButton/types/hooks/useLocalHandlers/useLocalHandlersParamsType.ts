import { Dispatch, SetStateAction } from 'react';

import { IStream } from '../../api';
import { StreamsApiDataType } from '../useStreamsData/StreamsApiDataType';

export type useLocalHandlersParamsType = {
  createMeetingStatus: boolean;
  changeMeetingLogicState: (fields: Record<string, any>) => void;
  selectedStream: {
    set: (stream: IStream) => void;
    state: IStream | null;
  };
  streamsApi: StreamsApiDataType;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (
    selectedStream: IStream,
    set: (stream: IStream) => void
  ) => Promise<any>;
  showError: (error: string | string[]) => void;
  setClickStartStopStreamHandler: Dispatch<
    SetStateAction<{ status: 'mock' | 'real'; func: () => void }>
  >;
};
