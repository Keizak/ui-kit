import { OperationType } from './types';
import {
  HandlingErrorResultCodeActions,
  withHandlingErrorResultCode,
} from './withHandlingErrorResultCode/withHandlingErrorResultCode';
import {
  withProcessVisualization,
  withProcessVisualizationActions,
} from './withProcessVisualization/withProcessVisualization';
import { withTryCatch, withTryCatchActions } from './withTryCatch/withTryCatch';

export type commonAsyncHandlerSettingsType = {
  withProcessVisualization: boolean;
  withNotification: boolean;
};
/**
 * commonAsyncHandlerActions -
 * (EN) Interface that extends the interfaces of actions performed in functions
 * (RU) Интерфейс наследующий интерфейсы действий выполняемых в функциях
 *   showError: (message: string) => void;
 *   showSuccess: (message: string) => void;
 *   setRequestStatus: (value: RequestStatuses) => void;
 */

export interface commonAsyncHandlerActions
  extends HandlingErrorResultCodeActions,
    withProcessVisualizationActions,
    withTryCatchActions {}

/**
 * сommonAsyncHandler -
 * (EN)  component - a wrapper that adds a layer that allows errors to be displayed and visualization of a non-server request
 * (RU)  функция сommonAsyncHandler прогоняет запрос на сервер через цепочку функций,
 * указывающих на успех или провал,с последующим выводом сообщений и визуализаций процесса
 * @param {OperationType} operation - the function that fulfills the promise
 * @param {commonAsyncHandlerActions} actions - set of functions executed in a chain of functions
 * @param {commonAsyncHandlerSettingsType} settings - a set of settings for changing the number of shells
 */
export let commonAsyncHandler = function <T = any>(
  operation: OperationType<T>,
  actions: commonAsyncHandlerActions,
  settings: commonAsyncHandlerSettingsType
) {
  let handledErrorResultCodeResult = withHandlingErrorResultCode(
    operation,
    actions,
    settings
  );

  let tryCatchResult = withTryCatch(
    handledErrorResultCodeResult,
    actions,
    settings
  );
  let processVisualizationResult = withProcessVisualization(
    tryCatchResult,
    actions,
    settings
  );

  return processVisualizationResult();
};

// -------------------------------------------------EXAMPLE-----------------------------------------------------

// export const dispatchWrapperCommonAsyncHandler = <T>(
//     operation: OperationType<T>,
//     dispatch: any,
//     actions: any
// ) => {
//   const functionsWithDispatch: commonAsyncHandlerActions = {
//     showError: (value) => dispatch(actions.showError(value)),
//     showSuccess: (value) => dispatch(actions.showSuccess(value)),
//     setRequestStatus: (value) => dispatch(actions.setRequestStatus(value)),
//   };
//
//   return newCommonAsyncHandler(operation, functionsWithDispatch);
// };
