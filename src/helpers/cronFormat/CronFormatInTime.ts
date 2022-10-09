import dayjs from 'dayjs';

/**
 * Функция преобразует крон формат в массив нормальных дат
 */
// export const CronFormatInTime = (cron: string, customOptions: any) => {
//   const result = [''];
//   const currentDate = new Date();
//   const defaultOptions = {
//     currentDate: currentDate,
//     endDate: new Date(currentDate.setMonth(currentDate.getMonth() + 8)),
//     iterator: true,
//   };
//
//   const interval = parser.parseExpression(
//     cron,
//     customOptions ? customOptions : defaultOptions
//   );
//
//   // eslint-disable-next-line no-constant-condition
//   while (true) {
//     try {
//       let obj: any = interval.next();
//
//       result.push(obj.value.toString());
//     } catch (e) {
//       break;
//     }
//   }
//
//   return result;
// };

/**
 * Функция приобразующая формат Даты в крон формат
 */
export const dateToCron = (date: Date) => {
  const minutes = dayjs(date).get('m');
  const hours = dayjs(date).get('h');
  const days = dayjs(date).get('D');
  const months = dayjs(date).get('M');
  const dayOfWeek = dayjs(date).day();

  return `${minutes} ${hours} ${days} ${months} ${dayOfWeek}`;
};
