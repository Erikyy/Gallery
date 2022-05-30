import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useSignup } from '../../utils/Api';
import { Button } from '../Button';
import { Input } from '../forms/Input';
import { Spinner } from '../Spinner';

export const SignupForm: FC = () => {
  const navigate = useNavigate();
  const { loading, signup, error } = useSignup();
  const [passwordMatchErr, setPasswordMatchErr] = useState('');
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (
      e.target.elements.password?.value ===
      e.target.elements.confirmPassword?.value
    ) {
      signup(
        {
          email: e.target.elements.email?.value,
          username: e.target.elements.username?.value,
          password: e.target.elements.password?.value
        },
        () => {
          navigate('/login');
        }
      );
    } else {
      setPasswordMatchErr("Passwords don't match!");
    }
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
    <div className="p-4 mr-auto ml-auto border rounded-xl bg-slate-100 dark:bg-slate-700 border-slate-100 dark:border-slate-500 shadow-xl sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6">
      <form className="" onSubmit={handleSubmit}>
        <Input id="email" label="Email" type="email" />
        <Input id="username" label="Username" type="text" />
        <Input id="password" label="Password" type="password" />
        <Input id="confirmPassword" label="Confirm password" type="password" />
        <ErrorMsg />
        {passwordMatchErr !== '' && (
          <span className="text-red-600">{passwordMatchErr}</span>
        )}
        <div className="pt-4 w-full flex justify-between align-middle">
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : 'Signup'}
          </Button>
          <p className="dark:text-white">
            Already have an account?{' '}
            <Link
              className="text-blue-500 dark:text-blue-400 hover:underline"
              to="/login"
            >
              Log in!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
