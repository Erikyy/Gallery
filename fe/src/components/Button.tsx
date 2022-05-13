import React, { FC } from 'react';

interface ButtonProps {
  onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button
      className="border text-lg w-full align-middle center text-center h-10 border-slate-400 rounded-full py-2 px-6"
      onClick={() => {
        if (onClick) onClick();
      }}
    >
      {children}
    </button>
  );
};
