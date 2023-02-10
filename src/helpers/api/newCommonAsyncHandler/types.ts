export enum ActionResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export const RequestStatuses = {
  None: 0,
  InProgress: 1,
  Finished: 2,
} as const;

export type RequestStatusesType =
  typeof RequestStatuses[keyof typeof RequestStatuses];
export type OperationType<T> = () => Promise<T>;
