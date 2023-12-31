import React from 'react';

import { StyledSvg } from '../../ui-styled-components/common';

/**
 * SVG иконка указывающая на выход
 */
export const PlusPersonSvg = () => {
  return (
    <StyledSvg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 19.5H14.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 21.5V17.5"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.16 10.87C12.06 10.86 11.94 10.86 11.83 10.87C9.45 10.79 7.56 8.84 7.56 6.44C7.55 3.99 9.54 2 11.99 2C14.44 2 16.43 3.99 16.43 6.44C16.43 8.84 14.53 10.79 12.16 10.87Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.99 21.81C10.17 21.81 8.35999 21.35 6.97999 20.43C4.55999 18.81 4.55999 16.17 6.97999 14.56C9.72999 12.72 14.24 12.72 16.99 14.56"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </StyledSvg>
  );
};
