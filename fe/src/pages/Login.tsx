import { FC } from 'react';
import LoginForm from '../common/components/LoginForm';
import { useAuth } from '../utils/auth';

export const Login: FC = () => {
  const auth = useAuth();
  return (
    <div className="flex h-screen justify-center items-center bg-slate-100">
      <LoginForm
        onSubmit={(username: string, password: string) => {
          console.log(username, password);
        }}
      />
    </div>
  );
};
