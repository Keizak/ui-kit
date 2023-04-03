import { ChangeMeetingLogicStateType } from '../useMeetingLogic/ChangeMeetingLogicStateType';
import { useMeetingLogicParamsType } from '../useMeetingLogic/useMeetingLogicParamsType';

export interface useMeetingHandlersParams extends useMeetingLogicParamsType {
  changeMeetingLogicState: ChangeMeetingLogicStateType;
}
