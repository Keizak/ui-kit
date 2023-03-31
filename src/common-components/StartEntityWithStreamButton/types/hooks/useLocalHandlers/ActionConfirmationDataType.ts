import React from 'react';

import { currentActionType } from './currentActionType';

export type ActionConfirmationDataType = {
  actionConfirmationStatus: {
    state: boolean;
    set: React.Dispatch<React.SetStateAction<boolean>>;
  };
  currentAction: currentActionType;
};
