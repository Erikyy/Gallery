import { FC } from 'react';

interface FormButtonProps {
  value?: string;
}

const FormButton: FC<FormButtonProps> = ({ value }) => {
  return (
    <input
      type="submit"
      value={value}
      className="bg-violet-700 rounded-xl hover:bg-violet-600 text-white p-2 pr-4 pl-4 w-min"
    />
  );
};

export default FormButton;
