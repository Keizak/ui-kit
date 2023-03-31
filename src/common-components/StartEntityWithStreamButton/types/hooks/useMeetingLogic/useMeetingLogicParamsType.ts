import { IStream } from '../../api';

export type useMeetingLogicParamsType = {
  selectedStream: {
    set: (stream: IStream) => void;
    state: IStream | null;
  };
  updateStream: (newStream: IStream) => any;
};
