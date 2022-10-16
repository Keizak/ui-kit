import dayjs from 'dayjs';

/**
 * Функция приобразующая формат Даты в крон формат
 */
export const dateToCron = (date: Date): string => {
  const minutes = dayjs(date).get('m');
  const hours = dayjs(date).get('h');
  const days = dayjs(date).get('D');
  const months = +dayjs(date).get('M') + 1;
  const dayOfWeek = dayjs(date).day();

  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};
