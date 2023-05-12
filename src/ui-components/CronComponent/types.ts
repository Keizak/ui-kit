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

export enum DaysOfWeeksForSave {
  'Понедельник' = 'MON',
  'Вторник' = 'TUE',
  'Среда' = 'WED',
  'Четверг' = 'THU',
  'Пятница' = 'FRI',
  'Суббота' = 'SAT',
  'Воскресенье' = 'SUN',
}

export enum DaysOfWeeks {
  'MON' = 'Понедельник',
  'TUE' = 'Вторник',
  'WED' = 'Среда',
  'THU' = 'Четверг',
  'FRI' = 'Пятница',
  'SAT' = 'Суббота',
  'SUN' = 'Воскресенье',
}

export type DaysOfWeeksValues =
  | 'MON'
  | 'TUE'
  | 'WED'
  | 'THU'
  | 'FRI'
  | 'SAT'
  | 'SUN';

export type DaysOfWeeksKeysType = keyof typeof DaysOfWeeks;

export type CronComponentPropsType = {
  onSubmit?: (value: string) => void;
  onChangeValue?: (value: string) => void;
  withButton?: boolean;
  defaultValue?: string;

  changeMode?: boolean;
  switchCrone?: boolean;
  editMode?: boolean;

  modeCroneSelectors?: {
    period: 'once' | 'multiple';
    day: 'once' | 'multiple';
    month: 'once' | 'multiple';
    hours: 'once' | 'multiple';
    minutes: 'once' | 'multiple';
  };
};
