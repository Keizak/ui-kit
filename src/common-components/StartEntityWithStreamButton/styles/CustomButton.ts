import styled from 'styled-components';

import { ButtonRequest } from '../../ButtonRequest/buttonRequest';

export const CustomButton = styled(ButtonRequest)`
  color: #f51a51 !important;
  font-family: 'Montserrat', sans-serif !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  min-height: 36px !important;
  border-radius: 30px !important;
  border: 1px solid #f51a51 !important;
  gap: 10px !important;
  background-color: white !important;
  transition: 0.3s ease-in-out !important;
  opacity: 1 !important;
  :hover {
    color: black;
  }
`;
