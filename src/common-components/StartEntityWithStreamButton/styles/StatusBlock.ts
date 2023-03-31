import styled from 'styled-components';

import { StatusesPositionType } from '../types';

export const StatusBlock = styled.div<{ position: StatusesPositionType }>`
  display: flex;
  align-items: center;
  margin: ${(props) => {
    switch (props.position) {
      case 'bottom':
        return '20px 0 0 0';
      case 'top':
        return '0 0 20px 0';
      case 'left':
        return '0 20px 0 0';
      case 'right':
        return '0 0 0 20px';
      default:
        return '';
    }
  }};
  font-family: 'Roboto', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #8c8889;
`;
