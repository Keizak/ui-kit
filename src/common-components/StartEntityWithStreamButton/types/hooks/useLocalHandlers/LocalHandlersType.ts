import { UseMutationResult } from 'react-query';

import { IStream } from '../../api';

import { chooseTextFunctionType } from './chooseTextFunctionType';

export type LocalHandlersType = {
  updateStream: (newStream: IStream | null | undefined) => void;
  changeStatusStream: (streamId: number, status: boolean) => Promise<any>;
  createStreamHandler: () => void;
  clickSettingsHandler: () => void;
  clickStartStopStreamHandler: () => void;
  createMeeting: UseMutationResult<any, any, {}, any>;
  chooseText: chooseTextFunctionType;
  getConfirmHandler: (action: 'start' | 'stop') => void;
  actionConfirmationHandler: (action: 'start' | 'stop' | null) => void;
};
