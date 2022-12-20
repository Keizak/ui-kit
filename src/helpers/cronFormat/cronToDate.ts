import { getArraySymbolsFromStringWithSpaces } from '../commonHelpersFunctions';
import {MonthEnum} from "./dateToCron";

/**
 * Енам обозначающая позиции елиниц времени в крон выражение
 */
export enum CronDateENUM {
  seconds = 0,
  minutes,
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
  console.log(cron, 'cron')
  /**
   * Делаем из строки крон выражения , массив элементов в порядке позиций
   * 15 12,30 3 4 5 => ["15","12,30","3","4","5"]
   */
  const arrayDateValues = getArraySymbolsFromStringWithSpaces(cron);

  console.log(arrayDateValues, 'arrayDateValues')
  /**
   * С помощью енам выражения определяем значения позиций
   */
  const minutes = +arrayDateValues[CronDateENUM.minutes];
  const hours = +arrayDateValues[CronDateENUM.hours];
  const days = +arrayDateValues[CronDateENUM.days];
  const months = arrayDateValues[CronDateENUM.months];
  // @ts-ignore
  const monthToNumber = MonthEnum[months]

  const year =
      arrayDateValues[CronDateENUM.year] === '*' ?  new Date().getFullYear() : +arrayDateValues[CronDateENUM.year]

  /**
   * Формируем и возращаем дату
   */
  return new Date(year, monthToNumber, days, hours, minutes);
};
