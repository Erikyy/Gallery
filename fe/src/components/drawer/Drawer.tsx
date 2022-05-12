import React, { FC } from 'react';

interface DrawerProps {
  isOpen: boolean;
}

export const Drawer: FC<DrawerProps> = ({ children, isOpen }) => {
  return (
    <aside
      className={`transform top-0 left-0 bg-slate-100 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {children}
    </aside>
  );
};
