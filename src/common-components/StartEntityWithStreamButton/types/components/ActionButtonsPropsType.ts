import { CSSProperties } from 'react';

import { RequestStatuses } from '../../../../helpers';
import { LocalHandlersType, SelectedStreamDataType } from '../hooks';

export type ActionButtonsPropsType = {
  meetingIsCreatedWithStreamIsStartedOrOnlyStreamIsStarted: boolean;
  streamIsNotStartedMeetingIsNotCreated: boolean;
  requestStatus: RequestStatuses;
  selectedStream: SelectedStreamDataType;
  entityTitle: string;
  handlers: LocalHandlersType;
  disabledCreateMeetingButton: boolean;
  customButtonStyle?: CSSProperties;
  customButtonClassname: string;
  title: string;
  withNameOfStream: boolean;
  entityId?: string | number | null;
  streamRequestIsRunning: boolean;
};
