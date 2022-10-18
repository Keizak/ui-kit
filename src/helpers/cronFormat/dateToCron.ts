import dayjs from 'dayjs';

/**
 * Функция приобразующая формат Даты в крон формат
 */
export const dateToCron = (date: Date): string => {
  /**
   * Преобразуем значения из даты в отдельные числа
   */
  const minutes = dayjs(date).get('m');
  const hours = dayjs(date).get('h');
  const days = dayjs(date).get('D');
  const months = +dayjs(date).get('M') + 1;
  const dayOfWeek = dayjs(date).day();

  /**
   * Формируем из отдельных значения крон выражения формата "m h d m dw"
   */
  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};
