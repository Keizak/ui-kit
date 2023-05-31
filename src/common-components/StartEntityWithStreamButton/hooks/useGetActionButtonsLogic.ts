import { useState } from 'react';

import { IStream, LocalHandlersType, SelectedStreamDataType } from '../types';

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
    if (selectedStream.state) {
      const newStream: IStream = {
        ...selectedStream.state,
        title: newTitle,
      };

      setNameStream(newTitle);
      selectedStream.state && selectedStream.set(newStream);
      handlers.updateStream(newStream);
    }
  };

  const checkForDisableStartButton = (
    streamRequestIsRunning: boolean,
    withNameOfStream: boolean
  ) => {
    if (streamRequestIsRunning) return true;
    if (withNameOfStream) return startStreamButtonCheckForDisable();
    else return disabledCreateMeetingButton;
  };

  const getStartButtonTitle = (
    streamRequestIsRunning: boolean,
    selectedStream: boolean,
    title: string
  ) => {
    if (streamRequestIsRunning) return 'Stream is updating';
    if (selectedStream) return title;
    else return `You don't have access to this type of streams`;
  };

  return {
    localHandlers: {
      onChangeNameStreamHandler,
      checkForDisableStartButton,
      getStartButtonTitle,
    },
    values: {
      nameStream,
    },
  };
};
