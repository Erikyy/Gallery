import React, { FC, HTMLInputTypeAttribute, useRef, useState } from 'react';

interface InputProps {
  type: HTMLInputTypeAttribute;
  label: string;
  id: string;
  error?: string;
}
export const Input: FC<InputProps> = ({ type, label, id, error }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<any>();
  return (
    <div className="flex flex-col">
      <label
        className={`bg-white w-min relative transition-all ease-in-out duration-100 ${
          focused || inputRef.current?.value !== ''
            ? 'top-3 left-3 text-sm '
            : 'top-10 left-3 text-sm'
        } p-2`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        onFocus={() => {
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
        className="rounded border border-slate-300 "
        type={type}
        id={id}
      />
      {error && <span className="text-red-600 pt-2">{error}</span>}
    </div>
  );
};