import React from 'react';

import { SnackbarProvider } from 'notistack';

import { GlobalLoading } from './GlobalLoading';
import { Notifications } from './Notifications';

type SnackbarComponentPropsType = {
  requestStatus: number;
  error: string | string[];
  success: string | string[];
  resetNotifications: () => void;
  maxSnack?: number;
  action?: React.ReactNode;
};
/**
 * SnackbarComponent -
 * (EN)  a component that allows errors to be displayed and visualization of a non-server request
 * LinearProgress/> - responsible for displaying the request status
 * <Notifications/> - responsible for popping up the message
 * (RU)  компнента - добавляет слой позволяющий отображаться ошибки и визуализацию запроса не сервер,
 * <LinearProgress/> - отвечает за отображения статуса запроса
 * <Notifications/> - отвечает за всплытие сообщение
 */
export const SnackbarComponent = (props: SnackbarComponentPropsType) => {
  /**
   * autoHideDuration - The time after which the pop-up window with the text will disappear
   */
  const autoHideDuration = 2000;

  return (
    <SnackbarProvider
      maxSnack={props.maxSnack ? props.maxSnack : 3}
      autoHideDuration={autoHideDuration}
      action={props.action}
    >
      <GlobalLoading requestStatus={props.requestStatus} />
      <Notifications
        autoHideDuration={autoHideDuration}
        resetNotifications={props.resetNotifications}
        success={props.success}
        error={props.error}
      />
    </SnackbarProvider>
  );
};
