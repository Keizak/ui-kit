import { getArraySymbolsFromStringWithSpaces } from '../commonHelpersFunctions';

/**
 * Енам обозначающая позиции елиниц времени в крон выражение
 */
export enum CronDateENUM {
  minutes = 0,
  hours,
  days,
  months,
  dayOfWeek,
  year,
}

/**
 * Функция приобразующая формат Даты в крон формат
 */
export const cronToDate = (cron: string): Date => {
  /**
   * Делаем из строки крон выражения , массив элементов в порядке позиций
   * 15 12,30 3 4 5 => ["15","12,30","3","4","5"]
   */
  const arrayDateValues = getArraySymbolsFromStringWithSpaces(cron);
  /**
   * С помощью енам выражения определяем значения позиций
   */
  const minutes = +arrayDateValues[CronDateENUM.minutes];
  const hours = +arrayDateValues[CronDateENUM.hours];
  const days = +arrayDateValues[CronDateENUM.days];
  const months = +arrayDateValues[CronDateENUM.months] - 1;
  const year =
    arrayDateValues.length > 5
      ? +arrayDateValues[CronDateENUM.year]
      : new Date().getFullYear();

  /**
   * Формируем и возращаем дату
   */
  return new Date(year, months, days, hours, minutes);
};
