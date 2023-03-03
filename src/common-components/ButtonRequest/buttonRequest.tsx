import React, { useEffect } from 'react';

import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';

import { RequestStatuses } from '../../helpers';

type ButtonRequestPropsType = ButtonProps & {
  requestStatus: RequestStatuses;
};
export const ButtonRequest = (props: ButtonRequestPropsType) => {
  const [localDisabled, setLocalDisabled] = React.useState(false);

  const buttonDisabled = localDisabled && props.disabled;

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setLocalDisabled(true);
    props.onClick && props.onClick(e);
  };

  useEffect(() => {
    if (props.requestStatus !== RequestStatuses.InProgress && localDisabled) {
      setLocalDisabled(false);
    }
  }, [props.requestStatus]);

  return (
    <Button
      {...props}
      disabled={buttonDisabled}
      onClick={(e) => onClickHandler(e)}
    >
      {props.children}
    </Button>
  );
};
