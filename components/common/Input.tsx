import { FC, HTMLInputTypeAttribute } from 'react';

interface InputProps {
  onChange?: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
}

const Input: FC<InputProps> = ({ onChange, type, value, placeholder }) => {
  return (
    <input
      className="border-2"
      onChange={(e) => {
        if (onChange) onChange(e.target.value);
      }}
      type={type}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
