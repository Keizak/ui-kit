import { IBaseEntity } from './APIBaseEntity';
import { IStreamSnapshot } from './IStreamSnapshot';
import { StreamStatusType } from './StreamStatusType';

export interface IStreamSession extends IBaseEntity {
  streamSnapshot: IStreamSnapshot;
  status: StreamStatusType;
  startDate: string;
  stopDate: string | null;
  videoStreamId: number;
  code: string;
}
