import { FC } from 'react';
import LoginForm from '../common/components/LoginForm';
import { useAuth } from '../utils/auth';

export const Login: FC = () => {
  const auth = useAuth();
  return (
    <div className="flex h-screen justify-center items-center  bg-gradient-to-tr from-sky-600 dark:from-sky-900 via-violet-600 dark:via-indigo-900 to-pink-600 dark:to-pink-900 transition-all">
      <LoginForm
        onSubmit={(username: string, password: string) => {
          console.log(username, password);
        }}
      />
    </div>
  );
};
