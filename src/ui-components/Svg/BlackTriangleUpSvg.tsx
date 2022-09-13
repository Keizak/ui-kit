import React from 'react';

import { StyledSvg } from '../../ui-styled-components/common';

/**
 * SVG иконка черный закрашенный треугольник указывающий вверх
 */
export const BlackTriangleUpSvg = () => {
  return (
    <StyledSvg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="black" />
    </StyledSvg>
  );
};
