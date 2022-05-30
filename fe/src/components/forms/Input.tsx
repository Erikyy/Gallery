import React, { FC, HTMLInputTypeAttribute, useRef, useState } from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  label: string;
  id: string;
  error?: string;
  defaultValue?: string;
}
export const Input: FC<InputProps> = ({
  type,
  label,
  id,
  error,
  defaultValue
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<any>();
  return (
    <div className="flex flex-col">
      <label
        className={`bg-neutral-100 dark:bg-neutral-700 dark:text-gray-100 max-w-fit relative transition-all ease-in-out duration-150 ${
          focused || (inputRef.current && inputRef.current.value !== '')
            ? 'top-3 left-3 text-sm '
            : 'top-10 left-3 text-sm'
        } p-2`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        ref={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        className="rounded border border-neutral-300 dark:border-neutral-500 bg-neutral-100 dark:bg-neutral-700 dark:text-white transition-colors duration-150 ease-in-out"
        type={type}
        id={id}
      />
      {error && <span className="text-red-600 pt-2">{error}</span>}
    </div>
  );
};
