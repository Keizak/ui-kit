import cronstrue from 'cronstrue';
import 'cronstrue/locales/ru';

/**
 * Функция преобразует крон формат в массив нормальных дат
 */
export const CronFormatInTimeRU = (cron: string) => {
  if (!cron) return '';
  const countSpaces = cron.split(' ').length - 1;

  return cron && countSpaces === 4
    ? cronstrue.toString(cron, {
        use24HourTimeFormat: true,
        verbose: true,
        locale: 'ru',
      })
    : '';
};

export const CronFormatInTimeEN = (cron: string) => {
  if (!cron) return '';
  const countSpaces = cron.split(' ').length - 1;

  return cron && countSpaces === 4
    ? cronstrue.toString(cron, {
        use24HourTimeFormat: true,
        verbose: true,
      })
    : '';
};
