import { LoadingDataType } from './LoadingDataType';
import { SelectedStreamDataType } from './SelectedStreamDataType';
import { StreamsApiDataType } from './StreamsApiDataType';
import { StreamsDataType } from './StreamsDataType';

export type UseStreamsDataReturnType = {
  streams: StreamsDataType;
  selectedStream: SelectedStreamDataType;
  streamsApi: StreamsApiDataType;
  loading: LoadingDataType;

  streamRequestIsRunning: boolean;
};
