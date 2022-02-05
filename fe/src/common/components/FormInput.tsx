import { FC, HTMLInputTypeAttribute, ReactNode } from 'react';

interface FormInputProps {
  onChange: (value: string) => void;
  type?: HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const FormInput: FC<FormInputProps> = ({
  onChange,
  type,
  value,
  leftIcon,
  rightIcon,
  placeholder,
}) => {
  return (
    <div className="flex w-full">
      {leftIcon ? <span>{leftIcon}</span> : null}
      <input
        type={type}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        value={value}
        className="border-2 border-slate-200 bg-slate-100 rounded-xl p-2 focus: focus:border-violet-600 focus:outline-none w-full"
        placeholder={placeholder}
      />
      {rightIcon ? <span>{rightIcon}</span> : null}
    </div>
  );
};

export default FormInput;
