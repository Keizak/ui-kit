import { ActionResultCodes } from '../../types/types';

export type OperationType<T> = () => Promise<T>;

export enum RequestStatuses {
  None = 0,
  InProgress = 1,
  Finished = 2,
}

export interface IActions {
  setRequestStatus?: (value: RequestStatuses) => void;
  showError?: (message: string) => void;
  showSuccess?: (message: string) => void;
}

type ErrorType = {
  message: string;
};

// First operation commonAsyncHandler
export const withHandlingErrorResultCode = function <T>(
  operation: OperationType<T>,
  dispatch: any,
  actions: IActions
) {
  return async () => {
    let typedResult: T = await operation();
    let result: any = typedResult;

    if (
      result &&
      result.resultCode &&
      result.resultCode > ActionResultCodes.Success &&
      result.messages &&
      result.messages.length > 0
    ) {
      actions.showError && dispatch(actions.showError(result.messages[0]));
      // dispatch(showError(result.messages[0]))
    } else if (result && result.resultCode == ActionResultCodes.Success) {
      actions.showSuccess &&
        dispatch(
          actions.showSuccess(
            result.messages && result.messages[0]
              ? result.messages[0]
              : 'Success'
          )
        );
      //dispatch(showSuccess(result.messages && result.messages[0] ? result.messages[0] : "Success"))
    }

    return typedResult;
  };
};

// Second operation commonAsyncHandler
export const withTryCatch =
  <T>(operation: OperationType<T>, dispatch: any, actions: IActions) =>
  async () => {
    try {
      return await operation();
    } catch (error) {
      let err = error as ErrorType;

      actions.showError && dispatch(actions.showError(err.message));

      return null;
    }
  };

// Third operation commonAsyncHandler
export const withProcessVisualization = function <T>(
  operation: OperationType<T>,
  dispatch: any,
  actions: IActions
) {
  return async () => {
    actions.setRequestStatus &&
      dispatch(actions.setRequestStatus(RequestStatuses.InProgress));
    const result = await operation();

    actions.setRequestStatus &&
      dispatch(actions.setRequestStatus(RequestStatuses.Finished));

    return result;
  };
};

export let commonAsyncHandler = function <T = any>(
  operation: OperationType<T>,
  dispatch: any,
  actions: IActions
) {
  let handledErrorResultCode = withHandlingErrorResultCode(
    operation,
    dispatch,
    actions
  );
  let tryCatched = withTryCatch(handledErrorResultCode, dispatch, actions);
  let visualized = withProcessVisualization(tryCatched, dispatch, actions);

  return visualized();
};

export let configurateCommonAsyncHandler = (actions: IActions) => {
  // First operation commonAsyncHandler
  const withHandlingErrorResultCode = function <T>(
    operation: OperationType<T>,
    dispatch: any
  ) {
    return async () => {
      let typedResult: T = await operation();
      let result: any = typedResult;

      if (
        result &&
        result.resultCode &&
        result.resultCode > ActionResultCodes.Success &&
        result.messages &&
        result.messages.length > 0
      ) {
        actions.showError && dispatch(actions.showError(result.messages[0]));
        // dispatch(showError(result.messages[0]))
      } else if (result && result.resultCode == ActionResultCodes.Success) {
        actions.showSuccess &&
          dispatch(
            actions.showSuccess(
              result.messages && result.messages[0]
                ? result.messages[0]
                : 'Success'
            )
          );
        //dispatch(showSuccess(result.messages && result.messages[0] ? result.messages[0] : "Success"))
      }

      return typedResult;
    };
  };

  // Second operation commonAsyncHandler
  const withTryCatch =
    <T>(operation: OperationType<T>, dispatch: any) =>
    async () => {
      try {
        return await operation();
      } catch (error) {
        let err = error as ErrorType;

        actions.showError && dispatch(actions.showError(err.message));

        return null;
      }
    };

  // Third operation commonAsyncHandler
  const withProcessVisualization = function <T>(
    operation: OperationType<T>,
    dispatch: any
  ) {
    return async () => {
      actions.setRequestStatus &&
        dispatch(actions.setRequestStatus(RequestStatuses.InProgress));
      const result = await operation();

      actions.setRequestStatus &&
        dispatch(actions.setRequestStatus(RequestStatuses.Finished));

      return result;
    };
  };

  let commonAsyncHandler = function <T = any>(
    operation: OperationType<T>,
    dispatch: any
  ) {
    let handledErrorResultCode = withHandlingErrorResultCode(
      operation,
      dispatch
    );
    let tryCatched = withTryCatch(handledErrorResultCode, dispatch);
    let visualized = withProcessVisualization(tryCatched, dispatch);

    return visualized();
  };

  return commonAsyncHandler;
};
