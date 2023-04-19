import { IStream } from '../../api';

export type useLocalHandlersParamsType = {
  createMeetingStatus: boolean;
  changeMeetingLogicState: (fields: Record<string, any>) => void;
  selectedStream: {
    set: (stream: IStream) => void;
    state: IStream | null;
  };
  streamsApi: {
    updateStream: (newStream: IStream) => any;
    getStreams: () => void;
  };
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;

  beforeStartStream?: (
    selectedStream: IStream,
    set: (stream: IStream) => void
  ) => Promise<any>;
};
