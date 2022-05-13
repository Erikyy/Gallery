import React, { FC } from 'react';
import { Outlet } from 'react-router';

export const Base: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
