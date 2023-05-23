import { useState } from 'react';

import { LocalHandlersType, SelectedStreamDataType } from '../types';

type useGetActionButtonsLogicParamsType = {
  entityId?: string | number | null;
  disabledCreateMeetingButton: boolean;
  selectedStream: SelectedStreamDataType;
  handlers: LocalHandlersType;
};
export const useGetActionButtonsLogic = ({
  disabledCreateMeetingButton,
  selectedStream,
  handlers,
}: useGetActionButtonsLogicParamsType) => {
  const [nameStream, setNameStream] = useState('');

  const startStreamButtonCheckForDisable = () => {
    if (disabledCreateMeetingButton) return true;

    return nameStream.length <= 1;
  };

  const onChangeNameStreamHandler = (newTitle: string) => {
    setNameStream(newTitle);
    selectedStream.state &&
      selectedStream.set({
        ...selectedStream.state,
        title: newTitle,
      });
  };
  const onSaveNameStreamHandler = (newTitle: string) => {
    selectedStream.state &&
      handlers.updateStream({
        ...selectedStream.state,
        title: newTitle,
      });
  };

  return {
    localHandlers: {
      onSaveNameStreamHandler,
      onChangeNameStreamHandler,
      startStreamButtonCheckForDisable,
    },
    values: {
      nameStream,
    },
  };
};
