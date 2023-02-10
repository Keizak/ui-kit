import { AxiosError } from 'axios';

import { commonAsyncHandlerSettingsType } from '../common-async-handler';
import { OperationType } from '../types';

export interface withTryCatchActions {
  showError: (message: string) => void;
}

/**
 * withTryCatch -
 * (EN) the function returns a function that fulfills the promise in the try catch block, and in case of an error,
 * outputs it
 * (RU) функция возвращает функцию, которая выполняет обещание в блоке try catch, и в случае ошибки выводит его
 * @param actions - set of functions to show error or success
 * @param operation - the function that fulfills the promise
 * @param settings - a set of settings for changing the number of shells
 */
export const withTryCatch =
  <T>(
    operation: OperationType<T>,
    actions: withTryCatchActions,
    settings: commonAsyncHandlerSettingsType
  ) =>
  async () => {
    try {
      return await operation();
    } catch (error) {
      let err = error as AxiosError<any>;

      const errorResultMessage = err?.response?.data?.message;
      const errorResultError = err?.response?.data?.error;

      if (errorResultMessage || errorResultError) {
        settings.withNotification &&
          actions.showError(errorResultMessage || errorResultError);
      }

      return null;
    }
  };
