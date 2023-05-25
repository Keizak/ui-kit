import { Dispatch, SetStateAction } from 'react';

import { StreamTypes } from '../../api';

export type useStreamsDataParams = {
  userId: number;
  type: StreamTypes | StreamTypes[];
  setLocalLoading: Dispatch<SetStateAction<boolean>>;
};
