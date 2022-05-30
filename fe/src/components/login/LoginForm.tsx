import React, { FC } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useLogin } from '../../utils/Api';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { Spinner } from '../Spinner';

export const LoginForm: FC = () => {
  const navigate = useNavigate();
  const { loading, login, error } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(
      e.target.elements.username?.value,
      e.target.elements.password?.value,
      () => {
        navigate('/');
      }
    );
  };
  return (
    <div className="p-4 mr-auto ml-auto border rounded-xl bg-slate-100 dark:bg-slate-700 border-slate-100 dark:border-slate-500 shadow-xl sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6">
      <form className="" onSubmit={handleSubmit}>
        <Input
          id="username"
          label="Username"
          type="text"
          error={error && error.username && error.username[0]}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          error={error && error.password && error.password[0]}
        />
        {error && error.detail && (
          <span className="text-red-600">{error.detail}</span>
        )}
        <div className="pt-4 w-full flex justify-between">
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : 'Login'}
          </Button>
          <p className="dark:text-white">
            Not registered?{' '}
            <Link
              className="text-blue-500 dark:text-blue-400 hover:underline"
              to="/signup"
            >
              Sign up here!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
