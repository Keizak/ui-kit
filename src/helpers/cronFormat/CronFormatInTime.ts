import cronstrue from 'cronstrue';
import 'cronstrue/locales/ru';

/**
 * Функция преобразует крон формат в массив нормальных дат,
 * поддерживает русскую и английскую локализацию
 */
export const CronFormatInTime = (cron: string, locale: string = 'ru') => {
  /**
   * в случае отрицательного значения возращаем пустую строку
   */
  if (!cron) return '';

  /**
   * Узнаем колтичество пробелов для коректногоо вызова cronstrue
   * так как она принимает только 5 символов разделенных пробелами,не больше не меньше
   */
  const countSpaces = cron.split(' ');

  const parsedCron = `${countSpaces[1]} ${countSpaces[2]} ${countSpaces[3]} ${countSpaces[4]} ${countSpaces[5]}`

  /**
   * Преобразуем выражение крон в текстовый формат с помощью пакета cronstrue
   */
  return cron
    ? cronstrue.toString(parsedCron, {
        use24HourTimeFormat: true,
        verbose: true,
        locale: locale,
      })
    : '';
};
