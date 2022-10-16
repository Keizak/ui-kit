import { TableTitleType } from '../ui-components/BasicTable/BasicTable';

//----------------------------------------createTitle---------------------------------------------

/**
 * Упрощает создание заголовка таблицы
 */
export const createTitle = (
  width: string,
  value: string,
  padding?: string
): TableTitleType => ({ width, value, padding });

export enum Statuses {
  NEW = 'new',
  ACTIVE = 'active',
  ONPAUSE = 'onPause',
  INACTIVE = 'inactive',
  COLLABORETIVE_WORK = 'collaborative-work',
  TRAINING = 'training',
}

//----------------------------------------chooseColorFromStatus---------------------------------------------
/**
 * Функция выбирает цвет статуса на основе значения статуса
 */
export const chooseColorFromStatus = (status: Statuses) => {
  switch (status) {
    case Statuses.ACTIVE:
      return '#2068F8';
    case Statuses.NEW:
      return '#802DD4';
    case Statuses.ONPAUSE:
      return '#EFA640';
    case Statuses.INACTIVE:
      return '#737067';
    default:
      return '#2068F8';
  }
};

//----------------------------------------getArraySymbolsFromStringWithSpaces-------------------------------------------
/**
 * Функция получает строку символов разделеных пробелами и возвращает массив этих символов
 */
export const getArraySymbolsFromStringWithSpaces = (string: string) => {
  const dateArray = [];
  let worString = string;
  const countSymbols = string.split(' ').length - 1;

  for (let i = 0; i < countSymbols + 1; i++) {
    const spaceMatch = worString.search(' ');

    if (spaceMatch > 0) {
      dateArray.push(worString.slice(0, spaceMatch));
      worString = worString.slice(spaceMatch + 1, worString.length);
    }

    if (spaceMatch < 0) dateArray.push(worString);
  }

  return dateArray;
};
