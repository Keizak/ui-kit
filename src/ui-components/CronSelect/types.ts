export type DateItemsType =
  | 'period'
  | 'day'
  | 'dayOfMonth'
  | 'hours'
  | 'minutes';
export type DateObjectType = {
  period: string;
  day: string[];
  dayOfMonth: string[];
  hours: string[];
  minutes: string[];
};

export enum DaysOfWeeks {
  'Понедельник' = 1,
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
}

export type CronComponentPropsType = {
  onSubmit?: (value: string) => void;
  withButton?: boolean;
  value?: string;
};
