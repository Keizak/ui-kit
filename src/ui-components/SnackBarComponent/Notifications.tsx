import React, { useEffect } from 'react';

import { useSnackbar } from 'notistack';

type NotificationsPropsType = {
  autoHideDuration: number;
  error: string | string[];
  success: string | string[];
  resetNotifications: () => void;
};

/**
 * Notifications -
 * (EN) the component draws an empty React.Fragment, carries the logic of displaying messages with errors or success
 * (RU) компонента рисует пустой React.Fragment, несет в себе лоргику отображения сообщений с ошибками или успехом
 * @param {number} props.autoHideDuration - the time after which the pop-up window with the text will disappear
 */
export const Notifications = (props: NotificationsPropsType) => {
  /**
   * useSnackbar -hook from notistack npm package ,
   * enqueueSnackbar - function to display a message
   */
  const { enqueueSnackbar } = useSnackbar();

  /**
   * showNotification - causes the message to pop up and after the specified timer resets all values in the state
   */
  const showNotification = (message: string, type: 'error' | 'success') => {
    enqueueSnackbar(message, { variant: type });
    /**
     * reset state
     */
    setTimeout(() => props.resetNotifications(), props.autoHideDuration);
  };

  const checkForArrayErrorMessages = (
    messages: string | string[],
    type: 'error' | 'success'
  ) => {
    if (Array.isArray(messages)) {
      messages.length > 0 &&
        messages.forEach((message) => showNotification(message, type));
    } else {
      showNotification(messages, type);
    }
  };

  useEffect(() => {
    props.error && checkForArrayErrorMessages(props.error, 'error');
  }, [props.error]);

  useEffect(() => {
    props.success && checkForArrayErrorMessages(props.success, 'success');
  }, [props.success]);

  return <></>;
};
