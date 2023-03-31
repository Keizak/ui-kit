import React from 'react';

import { IStream } from '../../api';

export type SelectedStreamDataType = {
  set: React.Dispatch<React.SetStateAction<IStream | null>>;
  state: IStream | null;
};
