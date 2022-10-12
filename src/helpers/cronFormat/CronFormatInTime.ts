import cronstrue from 'cronstrue';
import dayjs from 'dayjs';
import 'cronstrue/locales/ru';

/**
 * Функция преобразует крон формат в массив нормальных дат
 */
export const CronFormatInTime = (cron: string) => {
  return cronstrue.toString(cron, { locale: 'ru' });
};

/**
 * Функция приобразующая формат Даты в крон формат
 */
export const dateToCron = (date: Date) => {
  const minutes = dayjs(date).get('m');
  const hours = dayjs(date).get('h');
  const days = dayjs(date).get('D');
  const months = +dayjs(date).get('M') + 1;
  const dayOfWeek = dayjs(date).day();

  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};
