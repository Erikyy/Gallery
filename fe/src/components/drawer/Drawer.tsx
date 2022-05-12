import React, { Children, cloneElement, FC, isValidElement } from 'react';

interface DrawerProps {
  isOpen: boolean;
  drawerRef: any;
}

export const Drawer: FC<DrawerProps> = ({ children, isOpen, drawerRef }) => {
  const drawerChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, { isOpen });
    }
    return child;
  });
  return (
    <aside
      ref={drawerRef}
      className={`flex flex-col transform border-r border-r-slate-300 dark:border-r-slate-600 top-0 left-0 bg-slate-100 dark:bg-slate-800 dark:text-slate-100 fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {drawerChildren}
    </aside>
  );
};
