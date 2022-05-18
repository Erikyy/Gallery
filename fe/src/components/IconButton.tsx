import React, { FC, ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
}
export const IconButton: FC<IconButtonProps> = ({ children, icon }) => {
  return (
    <button className="">
      <span className="flex text-center space-x-2 dark:text-white">
        {icon}
        <p>{children}</p>
      </span>
    </button>
  );
};
