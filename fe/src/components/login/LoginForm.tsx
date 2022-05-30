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

  const ErrorMsg: FC = () => {
    const err: any = error;
    if (err && err.message) {
      if (Array.isArray(err.message)) {
        return err.message.map((msg: string) => {
          return <p className="text-red-600">{msg}</p>;
        });
      } else {
        return <p className="text-red-600">{err.message}</p>;
      }
    } else {
      return null;
    }
  };
  return (
    <div className="p-4 mr-auto ml-auto border rounded-xl bg-neutral-100 dark:bg-neutral-700 border-neutral-100 dark:border-neutral-600 shadow-xl sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6">
      <form className="" onSubmit={handleSubmit}>
        <Input id="username" label="Username" type="text" />
        <Input id="password" label="Password" type="password" />
        <ErrorMsg />
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
