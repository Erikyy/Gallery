import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../utils/Api';
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
        <div className="flex pr-4 p-2 h-full">
          <button className="border border-slate-400 rounded-2xl py-2 px-4">
            Login
          </button>
          <button className="border border-slate-400 rounded-2xl py-2 px-4">
            Signup
          </button>
        </div>
      )}
    </header>
  );
};
