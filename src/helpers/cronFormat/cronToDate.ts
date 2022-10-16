import { getArraySymbolsFromStringWithSpaces } from '../commonHelpersFunctions';

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
  const arrayDateValues = getArraySymbolsFromStringWithSpaces(cron);
  const minutes = +arrayDateValues[CronDateENUM.minutes];
  const hours = +arrayDateValues[CronDateENUM.hours];
  const days = +arrayDateValues[CronDateENUM.days];
  const months = +arrayDateValues[CronDateENUM.months] - 1;
  const year =
    arrayDateValues.length > 5
      ? +arrayDateValues[CronDateENUM.year]
      : new Date().getFullYear();

  return new Date(year, months, days, hours, minutes);
};
