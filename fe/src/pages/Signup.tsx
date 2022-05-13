import React, { FC } from 'react';
import { SignupForm } from '../components/login/SignupForm';

export const SignupPage: FC = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center">
      <SignupForm />
    </div>
  );
};
