import React, { FC, ReactNode } from 'react';

interface IconButtonProps {
  icon: ReactNode;
  onClick?: (e: any) => void;
}
export const IconButton: FC<IconButtonProps> = ({
  children,
  icon,
  onClick
}) => {
  return (
    <button onClick={onClick} className="">
      <span className="flex text-center space-x-2 dark:text-white">
        {icon}
        <p>{children}</p>
      </span>
    </button>
  );
};
