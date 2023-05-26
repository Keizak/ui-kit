import { IStream } from '../../api';

export type StreamsApiDataType = {
  getStreams: () => Promise<void>;
  updateStream: (newStream: IStream) => Promise<any>;
  stopStream: (streamId: number) => Promise<any>;
  startStream: (streamId: number) => Promise<any>;
  withStreamRequestIsRunningStatus: (
    operation: () => Promise<any>
  ) => Promise<any>;
};
