import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type FormElementType<T> = {
  title: string;
  name: Extract<keyof T, string>; // use Extract for get from ALL keys only keys that is string (may be also SYmbol, number...)
  component: React.FC<any>;
  props?: {
    //type?: "number" | "string"
    [key: string]: string | number | boolean;
  };
  editModeComponent?: React.FC<any>;
  settings?: {
    [key: string]: any;
  };
};

export type GridItemElementType<T, A> = {
  title: string;
  name: Extract<keyof T, string> | null; // use Extract for get from ALL keys only keys that is string (may be also SYmbol, number...)
  onlyTitle?: boolean;
  parser?: (value: any, state?: A) => any;
  pathToProp?: string;
  props?: {
    //type?: "number" | "string"
    [key: string]: string | number | boolean;
  };
  editModeComponent?: any;
  editModePropName?: Extract<keyof T, string> | null;
  editModePropType?: string;
};

export type RowDataType<T, V, D> = {
  item: T;
  edit: V;
  details: D;
};

export type CrudStateType<TUpdate, TEntity extends TUpdate & IBaseEntity> = {
  items: Array<TEntity>;
  editingItem: (TUpdate & { id: string | number }) | null;
  pagesCount: number;
  currentPage: number;
  pageSize: number;
  totalItemsCount: number;
  sortBy: null | string;
  sortDirection: 'desc' | 'asc' | null;
  searchTerms: {
    propName: string;
    propValue: string;
    propType: 'number' | 'string' | 'boolean';
  }[];
};

export interface IBaseEntity {
  id: number;
  addedAt: string; // ISO date string
  addedBy: number | null;
  updatedAt: string; // ISO date string
}

export interface IItemsResult<T> {
  pagesCount: number;
  pageSize: number;
  page: number;
  totalCount: number;
  items: Array<T>;
}

export interface IActionResult<T = {}> {
  data: T;
  messages: string[];
  resultCode: ActionResultCodes;
}

export enum ActionResultCodes {
  Success = 0,
  Error = 1,
  CaptchaIsRequired = 10,
}

export interface ICreateResultData<T> {
  item: T;
}

export interface ICreateActionResult<T>
  extends IActionResult<ICreateResultData<T>> {}

export type InferActionsTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U;
}
  ? U
  : never;

export type ThunkType<TAction extends Action, AppStateType> = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  TAction
>;

export enum MonthRuENUM {
  'Январь' = 1,
  'Февраль',
  'Апрель',
  'Март',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
}
