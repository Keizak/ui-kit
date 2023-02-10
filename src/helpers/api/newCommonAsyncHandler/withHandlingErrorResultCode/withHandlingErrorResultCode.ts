import { commonAsyncHandlerSettingsType } from '../common-async-handler';
import { ActionResultCodes, OperationType } from '../types';

export interface HandlingErrorResultCodeActions {
  showError: (message: string) => void;
  showSuccess: (message: string) => void;
}

/**
 * withHandlingErrorResultCode -
 * (EN) function returns a function that fulfills the promise and depending on the result code shows error or success
 * (RU) функция возвращает функцию, которая выполняет обещание и в зависимости от кода результата показывает ошибку или успех
 * @param actions - set of functions to show error or success
 * @param operation - the function that fulfills the promise
 * @param settings - a set of settings for changing the number of shells
 */
export const withHandlingErrorResultCode = function <T>(
  operation: OperationType<T>,
  actions: HandlingErrorResultCodeActions,
  settings: commonAsyncHandlerSettingsType
) {
  return async () => {
    let typedResult: T = await operation();
    let result: any = typedResult;

    //---------------------------------------------------Conditions-----------------------------------------------------

    /**
     * resultCodeIsNotSuccess -
     * (EN) the condition checks for the existence of a result and the value of the result code,
     * whether it is greater than Success
     * (RU) условие проверяет наличие результата и значение кода результата,
     * сравнивая его со значением успешного результата
     */
    const resultCodeIsNotSuccess =
      result &&
      result.resultCode &&
      result.resultCode > ActionResultCodes.Success;

    /**
     * resultCodeIsNotSuccess -
     * (EN) the condition checks for the existence of a result and the value of the result code,
     * whether it matches Success
     * (RU) условие проверяет наличие результата и значение кода результата,
     * соответствует ли он успеху
     */
    const resultCodeIsSuccess =
      result && result.resultCode == ActionResultCodes.Success;

    /**
     * resultCodeIsNotSuccess -
     * (EN) the condition checks for the existence of a result and the value of its messages
     * (RU) условие проверяет наличие результата и значение его сообщений
     */
    const resultMessages =
      result && result.messages && result.messages.length > 0;

    //------------------------------------------------------------------------------------------------------------------

    if (resultCodeIsNotSuccess && resultMessages) {
      settings.withNotification
        ? actions.showError(result.messages)
        : console.error(result.messages);
    } else if (resultCodeIsSuccess) {
      settings.withNotification &&
        actions.showSuccess(resultMessages ? result.messages[0] : 'Success');
    }

    return typedResult;
  };
};
