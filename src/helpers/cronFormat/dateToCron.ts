import dayjs from 'dayjs';


enum MonthEnum {
    JAN = 1,
    FEB = 2,
    MAR = 3,
    APR = 4,
    MAY = 5,
    JUN = 6,
    JUL = 7,
    AUG = 8,
    SEP = 9,
    OCT = 10,
    NOV = 11,
    DEC = 12
}

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
    const months: number = +dayjs(date).get('M') + 1;
    const dayOfWeek = dayjs(date).day();

    /**
     * Формируем из отдельных значения крон выражения формата "m h d m dw"
     */
    return `0 ${minutes} ${hours} ${days} ${MonthEnum[months]} ${dayOfWeek} *`;
};
