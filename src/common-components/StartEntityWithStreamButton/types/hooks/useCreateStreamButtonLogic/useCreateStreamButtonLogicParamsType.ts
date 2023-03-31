import { IStream, StreamTypes } from '../../api';

export type useCreateStreamButtonLogicParamsType = {
  type: StreamTypes | StreamTypes[];
  userId: number;
  asyncHandler: (operation: () => Promise<any>) => Promise<any>;
  onFinishCreateStream?: () => void;
  onFinishStopStream?: () => void;
  beforeStartStream?: (
    selectedStream: IStream,
    set: (stream: IStream) => void
  ) => Promise<any>;
};
