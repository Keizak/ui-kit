import { ActionConfirmationDataType } from '../useLocalHandlers/ActionConfirmationDataType';
import { LocalHandlersType } from '../useLocalHandlers/LocalHandlersType';
import { UseMeetingLogicReturnType } from '../useMeetingLogic/UseMeetingLogicReturnType';
import { LoadingDataType } from '../useStreamsData/LoadingDataType';
import { SelectedStreamDataType } from '../useStreamsData/SelectedStreamDataType';
import { StreamsApiDataType } from '../useStreamsData/StreamsApiDataType';
import { UseStyleFunctionsReturnType } from '../UseStyleFunctions/UseStyleFunctionsReturnType';

export type UseCreateStreamButtonLogicReturnType = {
  styleFunctions: UseStyleFunctionsReturnType;
  streamData: {
    streamsApi: StreamsApiDataType;
    selectedStream: SelectedStreamDataType;
    loading: LoadingDataType;
  };
  meetingsData: UseMeetingLogicReturnType;
  handlers: LocalHandlersType;
  actionConfirmationData: ActionConfirmationDataType;
};
