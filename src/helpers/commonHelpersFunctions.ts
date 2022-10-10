import { TableTitleType } from '../ui-components/BasicTable/BasicTable';

//----------------------------------------createTitle---------------------------------------------

/**
 * Упрощает создание заголовка таблицы
 */
export const createTitle = (
  width: string,
  value: string,
  padding?: string
): TableTitleType => ({ width, value, padding });

export enum Statuses {
  NEW = 'new',
  ACTIVE = 'active',
  ONPAUSE = 'onPause',
  INACTIVE = 'inactive',
  COLLABORETIVE_WORK = 'collaborative-work',
  TRAINING = 'training',
}

//----------------------------------------chooseColorFromStatus---------------------------------------------

export const chooseColorFromStatus = (status: Statuses) => {
  switch (status) {
    case Statuses.ACTIVE:
      return '#2068F8';
    case Statuses.NEW:
      return '#802DD4';
    case Statuses.ONPAUSE:
      return '#EFA640';
    case Statuses.INACTIVE:
      return '#737067';
    default:
      return '#2068F8';
  }
};
