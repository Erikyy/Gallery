import React, { FC } from 'react';

interface TextareaProps {
  label: string;
  id: string;
  error?: string;
  defaultValue?: string;
}

export const Textarea: FC<TextareaProps> = ({
  id,
  label,
  error,
  defaultValue
}) => {
  return (
    <div className="flex w-full mt-4">
      <div className="mb-3 w-full">
        <label
          htmlFor="exampleFormControlTextarea1"
          className="form-label inline-block mb-2 text-neutral-700 dark:text-neutral-100 transition-colors duration-150 ease-in-out"
        >
          {label}
        </label>
        <textarea
          id={id}
          defaultValue={defaultValue}
          className="
          
        form-control
        block
        w-full
        px-3mb-3
        py-1.5
        text-base
        font-normal
        text-neutral-700
        dark:text-neutral-100
        bg-neutral-100
        dark:bg-neutral-700
        bg-clip-padding
        border border-solid border-neutral-300
        dark:border-neutral-500
        rounded
        transition
        duration-150
        ease-in-out
        m-0
        focus:text-neutral-700 focus:bg-neutral-100 focus:border-blue-600 focus:outline-none
      "
          rows={3}
          placeholder={label}
        ></textarea>
      </div>
    </div>
  );
};
