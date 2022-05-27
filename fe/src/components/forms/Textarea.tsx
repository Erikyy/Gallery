import React, { FC } from 'react';

interface TextareaProps {
  label: string;
  id: string;
  error?: string;
}

export const Textarea: FC<TextareaProps> = ({ id, label, error }) => {
  return (
    <div className="flex w-full mt-4">
      <div className="mb-3 w-full">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label inline-block mb-2 text-gray-700 dark:text-gray-100 transition-colors duration-150 ease-in-out"
        >
          {label}
        </label>
        <textarea
          id={id}
          className="
          
        form-control
        block
        w-full
        px-3mb-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        dark:text-gray-100
        bg-slate-100
        dark:bg-slate-700
        bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        duration-150
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-slate-100 focus:border-blue-600 focus:outline-none
      "
          rows={3}
          placeholder={label}
        ></textarea>
      </div>
    </div>
  );
};
