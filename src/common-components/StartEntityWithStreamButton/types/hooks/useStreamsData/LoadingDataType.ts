import React from 'react';

export type LoadingDataType = {
  set: React.Dispatch<React.SetStateAction<boolean>>;
  state: boolean;
};
