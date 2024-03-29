import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../utils/Api';
import { Button } from './Button';
import { SideDrawer } from './drawer/SideDrawer';
import { ProfileHeader } from './ProfileHeader';

export const Header: FC = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <header className="fixed z-20 border-b justify-between px-4 py-2 ease-in-out transition-all duration-300 border-b-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 shadow-sm w-full flex flex-row align-middle h-16">
      <SideDrawer />
      {auth.authenticated ? (
        <ProfileHeader />
      ) : (
        <div className="flex h-full pt-1 align-middle justify-center">
          <Button
            onClick={() => {
              navigate('/login');
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              navigate('/signup');
            }}
          >
            Signup
          </Button>
        </div>
      )}
    </header>
  );
};
