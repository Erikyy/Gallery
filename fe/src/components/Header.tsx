import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../utils/Api';
import { Button } from './Button';
import { SideDrawer } from './drawer/SideDrawer';

export const Header: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <header className="border-b justify-between h-16 ease-in-out transition-all duration-300 border-b-gray-50 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 shadow-sm w-full flex">
      <SideDrawer />
      {auth.authenticated ? (
        <div>authenticated</div>
      ) : (
        <div className="flex p-4 h-full">
          <Button>Login</Button>
          <Button>Signup</Button>
        </div>
      )}
    </header>
  );
};
