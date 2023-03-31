import { currentActionType } from './currentActionType';

export type chooseTextFunctionType = (
  currentAction: currentActionType,
  entityTitle: string
) => string;
