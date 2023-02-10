import { commonAsyncHandlerSettingsType } from '../common-async-handler';
import { OperationType, RequestStatuses, RequestStatusesType } from '../types';

export interface withProcessVisualizationActions {
  setRequestStatus: (value: RequestStatusesType) => void;
}

/**
 * withProcessVisualization -
 * (EN) the function returns a function that, when the promise is fulfilled, adds the execution visualization
 * (RU) функция возвращает функцию, которая при выполнении обещания добавляет визуализацию выполнения
 * @param {withProcessVisualizationActions} actions - set of functions to set request status
 * @param {OperationType} operation - the function that fulfills the promise
 * @param {commonAsyncHandlerSettingsType} settings - a set of settings for changing the number of shells
 */
export const withProcessVisualization = function <T>(
  operation: OperationType<T>,
  actions: withProcessVisualizationActions,
  settings: commonAsyncHandlerSettingsType
) {
  return async () => {
    if (!settings.withProcessVisualization) return await operation();

    actions.setRequestStatus(RequestStatuses.InProgress);

    const result = await operation();

    actions.setRequestStatus(RequestStatuses.Finished);

    return result;
  };
};
