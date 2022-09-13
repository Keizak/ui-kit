import React from 'react';

import { StyledSvg } from '../../ui-styled-components/common';

/**
 * SVG иконка указывающая на выход
 */
export const SmallBlackCircleSvg = () => {
  return (
    <StyledSvg
      width="3"
      height="5"
      viewBox="0 0 3 3"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      margin={'0 5px 0 5px'}
    >
      <circle cx="1.5" cy="1.5" r="1.5" fill="black" />
    </StyledSvg>
  );
};
