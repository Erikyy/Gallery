import React, { FC } from 'react';

interface SelectProps {
  onChange: (e: any) => void;
}

export const Select: FC<SelectProps> = ({ children, onChange }) => {
  return (
    <div className="flex justify-center">
      <div className="mb-3 xl:w-36">
        <select
          onChange={onChange}
          className="form-select appearance-none
      block
      w-full
      px-3
      pr-7
      py-1.5
      text-base
      font-normal
      text-gray-700
      dark:text-white
      bg-white
      dark:bg-neutral-700 
      bg-clip-padding bg-no-repeat
      border border-solid border-neutral-300
      rounded-lg
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label="Default select example"
        >
          {children}
        </select>
      </div>
    </div>
  );
};
