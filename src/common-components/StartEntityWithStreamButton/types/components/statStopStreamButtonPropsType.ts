import { RequestStatuses } from '../../../../helpers';
import { IStream } from '../api';

export type statStopStreamButtonPropsType = {
  selectedStream: IStream;
  entityTitle: string;
  clickStartStopStreamHandler: () => void;
  clickSettingsHandler: () => void;
  requestStatus: RequestStatuses;
  disabled: boolean;
};
