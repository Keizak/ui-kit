import { UseMutationResult } from 'react-query';

import { chooseTextFunctionType } from './chooseTextFunctionType';

export type LocalHandlersType = {
  changeStatusStream: (streamId: number, status: boolean) => Promise<any>;
  createStreamHandler: () => void;
  clickSettingsHandler: () => void;
  clickStartStopStreamHandler: () => void;
  createMeeting: UseMutationResult<any, any, {}, any>;
  chooseText: chooseTextFunctionType;
  getConfirmHandler: (action: 'start' | 'stop') => void;
  actionConfirmationHandler: (action: 'start' | 'stop' | null) => void;
};
