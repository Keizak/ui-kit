import React, { SyntheticEvent } from 'react';

interface IDrawerList {
  children: React.ReactNode;
  toggleDrawer: (
    isDrower: boolean,
    isRight: boolean
  ) => (event: SyntheticEvent) => void;
  isRight: boolean;
}

export function DrawerList({ children, toggleDrawer, isRight }: IDrawerList) {
  return (
    <div
      role="presentation"
      onKeyDown={toggleDrawer(false, isRight)}
      onClick={toggleDrawer(false, isRight)}
    >
      {children}
    </div>
  );
}
