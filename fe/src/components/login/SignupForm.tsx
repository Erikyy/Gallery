import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useLogin, useSignup } from '../../utils/Api';
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
  return (
    <div className="p-4 mr-auto ml-auto border rounded-xl border-slate-300 shadow-xl sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6">
      <form className="" onSubmit={handleSubmit}>
        <Input id="email" label="Email" type="email" />
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
        <Input id="confirmPassword" label="Confirm password" type="password" />
        {error && error.detail && (
          <span className="text-red-600">{error.detail}</span>
        )}
        {passwordMatchErr !== '' && (
          <span className="text-red-600">{passwordMatchErr}</span>
        )}
        <div className="pt-4 w-full flex justify-between align-middle">
          <Button disabled={loading} type="submit">
            {loading ? <Spinner /> : 'Signup'}
          </Button>
          <p>
            Already have an account?{' '}
            <Link className="text-blue-500 hover:underline" to="/login">
              Log in!
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};
