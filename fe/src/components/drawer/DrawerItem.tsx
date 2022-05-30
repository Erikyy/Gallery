import React, { FC, ReactNode } from 'react';

interface DrawerItemProps {
  icon?: ReactNode;
  onClick?: () => void;
}

export const DrawerItem: FC<DrawerItemProps> = ({
  icon,
  onClick,
  children
}) => {
  return (
    <div
      onClick={onClick}
      className="p-4 w-full cursor-pointer rounded-xl hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors duration-150 ease-in-out mr-4"
    >
      <div className="flex flex-row align-middle justify-start">
        {icon && <span className="mr-8">{icon}</span>}
        <span className="mr-8">{children}</span>
      </div>
    </div>
  );
};

export const DrawerItemGeneric: FC = ({ children }) => {
  return (
    <div className="p-4 w-full">
      <div className="flex flex-row align-middle justify-start">{children}</div>
    </div>
  );
};
