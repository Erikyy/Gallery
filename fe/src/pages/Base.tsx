import React, { FC } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';

export const Base: FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
