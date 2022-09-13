import React from 'react';

import { StyledSvg } from '../../ui-styled-components/common';

/**
 * SVG иконка черный закрашенный треугольник указывающий вниз
 */
export const BlackTriangleDownSvg = () => {
  return (
    <StyledSvg
      width="8"
      height="5"
      viewBox="0 0 8 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ marginRight: '5px' }}
    >
      <path d="M4 5L0.535898 0.5L7.4641 0.5L4 5Z" fill="black" />
    </StyledSvg>
  );
};
