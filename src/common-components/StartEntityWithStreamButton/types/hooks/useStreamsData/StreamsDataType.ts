import React from 'react';

import { IStream } from '../../api';

export type StreamsDataType = {
  set: React.Dispatch<React.SetStateAction<IStream[]>>;
  state: IStream[];
};
