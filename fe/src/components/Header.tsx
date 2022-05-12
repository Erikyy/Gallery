import React, { FC } from 'react';
import { SideDrawer } from './drawer/SideDrawer';

export const Header: FC = () => {
  return (
    <header className="border-b h-16 ease-in-out transition-all duration-300 border-b-gray-50 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 shadow-sm w-full flex">
      <SideDrawer />
    </header>
  );
};
