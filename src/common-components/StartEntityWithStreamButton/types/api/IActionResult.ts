import { ActionResultCodes } from './ActionResultCodes';

export interface IActionResult<T = {}> {
  data: T;
  messages: string[];
  resultCode: ActionResultCodes;
}
