import React from 'react';

import { Drawer } from '@mui/material';

interface IProps {
  anchor: 'left' | 'top' | 'right' | 'bottom';
  isOpenDrawer: boolean;
  docked?: boolean;
  toggleDrawer: (isOpenDrawer: boolean) => (event: {}) => void;
  list: React.ReactNode;
}

export const DrawerComponent = ({
  anchor = 'left',
  isOpenDrawer,
  toggleDrawer,
  list,
}: IProps) => {
  return (
    <Drawer anchor={anchor} open={isOpenDrawer} onClose={toggleDrawer(false)}>
      {list}
    </Drawer>
  );
};
