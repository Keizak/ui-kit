import { IStream } from '../../api';
import { StreamsApiDataType } from '../useStreamsData/StreamsApiDataType';

export interface useMeetingLogicParamsType {
  selectedStream: {
    set: (stream: IStream) => void;
    state: IStream | null;
  };
  streamsApi: StreamsApiDataType;
}
