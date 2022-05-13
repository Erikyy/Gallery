import React, { FC } from 'react';
import { LoginForm } from '../components/login/LoginForm';

export const LoginPage: FC = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <LoginForm />
    </div>
  );
};
