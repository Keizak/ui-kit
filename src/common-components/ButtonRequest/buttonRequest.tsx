import React, { useEffect, useState } from 'react';

import { Button } from '@mui/material';
import { ButtonProps } from '@mui/material/Button/Button';
import styled from 'styled-components';

import { RequestStatuses } from '../../helpers';

type ButtonRequestPropsType = ButtonProps & {
  requestStatus: RequestStatuses;
  typeUiButton?: 'Mui' | 'classic';
};
export const ButtonRequest = (props: ButtonRequestPropsType) => {
  const [localDisabled, setLocalDisabled] = useState(false);
  const { typeUiButton = 'Mui', requestStatus, ...restProps } = props;

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
    if (requestStatus !== RequestStatuses.InProgress && localDisabled) {
      setLocalDisabled(false);
    }
  }, [requestStatus]);

  return typeUiButton === 'classic' ? (
    <button
      {...restProps}
      disabled={getButtonDisabled()}
      onClick={(e) => onClickHandler(e)}
    >
      {props.children}
    </button>
  ) : (
    <CustomButton
      {...restProps}
      disabled={getButtonDisabled()}
      onClick={(e) => onClickHandler(e)}
    >
      {props.children}
    </CustomButton>
  );
};

const CustomButton = styled(Button)`
  :disabled {
    background: gray !important;
  }
`;
