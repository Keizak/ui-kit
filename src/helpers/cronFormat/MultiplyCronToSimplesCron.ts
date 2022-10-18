import {
  getArraySymbolsFromStringWithSpaces,
  stringWithCommaToArray,
} from '../commonHelpersFunctions';

/**
 * Функция преобразует строку крон формата содержащую мультизначения в массив одиночных крон формат строк
 */
export const multiplyCronToSimplesCron = (cron: string) => {
  /**
   * Инициализируем значения :
   * crones - для наполленния одиночными крон строками
   * maxCronValues - максимальная колестрво крон строк
   */
  const crones = [];
  let maxCronValues = 0;
  /**
   * Делаем из строки крон выражения , массив элементов в порядке позиций
   * 15 12,30 3 4 5 => ["15","12,30","3","4","5"]
   * а дальше преобразуем этот массив из массива строк в массив массивов
   * ["15","12,30","3","4","5"] => [["15"],["12","30"],["3"],["4"],["5"]]
   */
  const arrayDateValues = getArraySymbolsFromStringWithSpaces(cron).map((el) =>
    stringWithCommaToArray(el)
  );

  /**
   * Защищаемся от плохих значений и ищем максимальную длину массива в полученном массиве,
   * что будет являться максимальным количеством крон строк
   */
  if (arrayDateValues.length > 0) {
    maxCronValues = arrayDateValues.reduce((accumulator, currentValue) => {
      return accumulator.length > currentValue.length
        ? accumulator
        : currentValue;
    }).length;
  }
  /**
   * запускаем цикл на создание maxCronValues строк путем добавление одинаковых элементов по счету,
   * в случае отстуствия элемента с таким же номером по дефолту берем первый элемент
   */
  for (let i = 1; i <= maxCronValues; i++) {
    /**
     * Формируем знаения для каждой из позиций
     */
    const minutes = arrayDateValues[0][i]
      ? arrayDateValues[0][i]
      : arrayDateValues[0][0];
    const hours = arrayDateValues[1][i]
      ? arrayDateValues[1][i]
      : arrayDateValues[1][0];
    const days = arrayDateValues[2][i]
      ? arrayDateValues[2][i]
      : arrayDateValues[2][0];
    const months = arrayDateValues[3][i]
      ? arrayDateValues[3][i]
      : arrayDateValues[3][0];
    const dayOfWeek = arrayDateValues[4][i]
      ? arrayDateValues[4][i]
      : arrayDateValues[4][0];

    /**
     * Добавляем в массив готовую крон строку
     */
    crones.push(`${minutes} ${hours} ${days} ${months} ${dayOfWeek}`);
  }

  /**
   * Возращаем массив одиноных крон строк
   */
  return crones;
};
