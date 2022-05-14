import React, { FC } from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';

export const Base: FC = () => {
  return (
    <div className="w-full h-full m-0">
      <div className="absolute mt-0">
        <Header />
      </div>

      <div className="mt-16">
        <Outlet />
      </div>
    </div>
  );
};
