import { ReactNode } from 'react';

import { TableTitleType } from '../../ui-components';

//----------------------------------------createTitle---------------------------------------------

/**
 * Упрощает создание заголовка таблицы
 */
export const createTitle = (
  width: string,
  value: ReactNode,
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
  /**
   * в случае отрицательной строки, вернет пустой массив
   */
  if (!string) return [];

  /**
   * Инициализируем значения :
   * dateArray - Массив который мы будем наполнять символами из строки
   * workString - строка с которой мы будем проводить манипуляции по вырезке символов
   */
  const dateArray = [];
  let workString = string;

  /**
   * Узнаем количество символов путем стирания пробелов в строке
   */
  const countSymbols = string.split(' ').length;

  /**
   * Запускаем цикл на количество символов в строке, для каждой итерации
   * ищем первый пробел и вырезаем символы до него, вставляем в массив в порядке итерации
   */
  for (let i = 1; i < countSymbols + 1; i++) {
    const spaceMatch = workString.search(' ');

    /**
     * Если символ пробела имеет индекс больше 0 , значит есть еще другие символы
     */
    if (spaceMatch > 0) {
      dateArray.push(workString.slice(0, spaceMatch));
      workString = workString.slice(spaceMatch + 1, workString.length);
    }
    /**
     * Если пробелов больше не осталось,значит остался одлин символ
     */
    if (spaceMatch < 0) dateArray.push(workString);
  }

  return dateArray;
};

//----------------------------------------------stringWithCommaToArray-------------------------------------------
/**
 * Функция получает строку символов разделенных запятой и преобразует в массив
 * в случае отрицательной строки, вернет пустой массив
 */
export const stringWithCommaToArray = (str: string) => {
  return str ? str.split(',') : [];
};

export const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};
