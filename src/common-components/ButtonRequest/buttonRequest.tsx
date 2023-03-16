import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';

import { RequestStatuses } from '../../helpers';

type ButtonRequestPropsType = ButtonProps & {
  requestStatus: RequestStatuses;
  typeUiButton?: 'Mui' | 'classic';
};
export const ButtonRequest = (props: ButtonRequestPropsType) => {
  const [localDisabled, setLocalDisabled] = useState(false);
  const { typeUiButton = 'Mui' } = props;

  const getButtonDisabled = () => {
    if (localDisabled) return true;
    else return props.disabled;
  };

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

  return typeUiButton === 'classic' ? (
    <button
      {...props}
      disabled={getButtonDisabled()}
      onClick={(e) => onClickHandler(e)}
    >
      {props.children}
    </button>
  ) : (
    <Button
      {...props}
      disabled={getButtonDisabled()}
      onClick={(e) => onClickHandler(e)}
    >
      {props.children}
    </Button>
  );
};
