import React, { FC } from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  type,
  disabled
}) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className={`block border ${
        disabled && 'disabled:bg-slate-400'
      } transition-colors duration-100 ease-linear hover:bg-purple-500 text-center border-slate-400 dark:border-slate-600 dark:text-white rounded-full h-10 px-6 mx-1`}
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};
