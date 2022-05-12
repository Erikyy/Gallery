import React, { FC } from 'react';
import { ThemeSwitch } from '../utils/ThemeSwitch';

export const Header: FC = () => {
  return (
    <header className="border border-gray-50 dark:border-gray-600 bg-slate-50 dark:bg-gray-800 shadow-xl w-full">
      <div>
        <ThemeSwitch />
      </div>
    </header>
  );
};
