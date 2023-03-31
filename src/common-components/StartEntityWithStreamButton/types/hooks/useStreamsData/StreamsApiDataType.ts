import { IStream } from '../../api';

export type StreamsApiDataType = {
  getStreams: () => Promise<void>;
  updateStream: (newStream: IStream) => Promise<any>;
};
