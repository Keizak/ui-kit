import React from 'react';

import { SnackbarAction, SnackbarProvider } from 'notistack';

import { GlobalLoading } from './GlobalLoading';
import { Notifications } from './Notifications';

type SnackbarComponentPropsType = {
  requestStatus: number;
  error: string | string[];
  success: string | string[];
  resetNotifications: () => void;
  maxSnack?: number;
  action?: SnackbarAction;
  resetMessagesDuration?: number;
  autoHideDuration?: number;
  colorGlobalLoading?:
    | 'primary'
    | 'secondary'
    | 'error'
    | 'info'
    | 'success'
    | 'warning'
    | 'inherit';
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
  const defaultAutoHideDuration = props.autoHideDuration
    ? props.autoHideDuration
    : 2000;

  const defaultMaxSnack = props.maxSnack ? props.maxSnack : 3;

  const defaultResetMessagesDuration = props.resetMessagesDuration
    ? props.resetMessagesDuration
    : 3000;

  return (
    <SnackbarProvider
      maxSnack={defaultMaxSnack}
      autoHideDuration={defaultAutoHideDuration}
      action={props.action}
    >
      <GlobalLoading
        requestStatus={props.requestStatus}
        colorGlobalLoading={props.colorGlobalLoading}
      />
      <Notifications
        autoHideDuration={defaultResetMessagesDuration}
        resetNotifications={props.resetNotifications}
        success={props.success}
        error={props.error}
      />
    </SnackbarProvider>
  );
};
