import { StreamTypes } from '../../api';

export type useStreamsDataParams = {
  userId: number;
  type: StreamTypes | StreamTypes[];
};
