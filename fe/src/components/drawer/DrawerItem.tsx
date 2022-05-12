import React, { FC, ReactNode } from 'react';

type DrawerItemType = 'button' | 'link';

interface DrawerItemProps {
  icon?: ReactNode;
  type?: DrawerItemType;
  onClick?: () => void;
}

export const DrawerItem: FC<DrawerItemProps> = ({
  icon,
  type = 'button',
  onClick
}) => {
  return <div className=""></div>;
};
