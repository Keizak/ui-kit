export enum RequestStatuses {
  None,
  InProgress,
  Finished,
}

export type RequestStatusesType =
  typeof RequestStatuses[keyof typeof RequestStatuses];
export type OperationType<T> = () => Promise<T>;
