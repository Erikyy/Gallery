import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import FormButton from './FormButton';
import FormInput from './FormInput';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}
const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [inputState, setInputState] = useState({
    username: '',
    password: '',
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputState.username, inputState.password);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-lg bg-slate-50 dark:bg-neutral-800 flex flex-col justify-center w-full h-full sm:h-auto p-6 sm:rounded-xl xl:w-1/5 lg:w-2/5 md:w-3/5 sm:w-5/6 transition-all ease-in-out duration-300"
    >
      <div className="flex flex-col space-y-4 w-full items-center">
        <h1 className="text-4xl p-4">Login</h1>
        <FormInput
          onChange={(value) => {
            setInputState({ ...inputState, username: value });
          }}
          value={inputState.username}
          type="text"
          placeholder="Username"
        />
        <FormInput
          onChange={(value) => {
            setInputState({ ...inputState, password: value });
          }}
          value={inputState.password}
          type="password"
          placeholder="Password"
        />
        <p>
          Don't have an account?{' '}
          <span>
            <Link className="text-violet-700" to={'/'}>
              Sign Up
            </Link>
          </span>
        </p>
        <FormButton value="Login" />
      </div>
    </form>
  );
};

export default LoginForm;
