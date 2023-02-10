import { commonAsyncHandler } from './common-async-handler';
import { OperationType, RequestStatusesType } from './types';

type asyncHandlerActionsType = {
  showError: (error: string) => void;
  showSuccess: (success: string) => void;
  setRequestStatus: (requestStatus: RequestStatusesType) => void;
};
type customCommonAsyncHandlerSettingsType = {
  withProcessVisualization?: boolean;
  withNotification?: boolean;
  actions: asyncHandlerActionsType;
};

export const asyncHandlerWithDefaultSettings = async (
  request: OperationType<any>,
  actions: asyncHandlerActionsType,
  customSettings?: customCommonAsyncHandlerSettingsType
) => {
  const defaultSettings = {
    withProcessVisualization: true,
    withNotification: true,
  };

  return await commonAsyncHandler(request, actions, {
    ...defaultSettings,
    ...customSettings,
  });
};
