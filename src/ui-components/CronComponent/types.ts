export type DateItemsType =
  | 'period'
  | 'day'
  | 'dayOfMonth'
  | 'hours'
  | 'minutes';
export type DateObjectType = {
  period: string;
  day: string[];
  dayOfMonth: number[];
  hours: number[];
  minutes: number[];
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
  onChangeValue?: (value: string) => void;
  withButton?: boolean;
  defaultValue?: string;
};
