import {
  CREATE_SESSION_INFORMATION_EventType,
  SESSION_FAILED_EventType,
  SESSION_STARTED_EventType,
} from '../../api';

export type useMeetingHandlersReturnParamsType = {
  handleCreateSessionInformation: (
    event: CREATE_SESSION_INFORMATION_EventType
  ) => void;
  handleSessionStarted: (event: SESSION_STARTED_EventType) => void;
  handleSessionFinished: () => void;
  handleMeetingFinished: () => void;
  handleSessionFailed: (event: SESSION_FAILED_EventType) => void;
};
