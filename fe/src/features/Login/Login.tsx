import { FC } from 'react';
import { useAuth } from '../../utils/auth';

export const Login: FC = () => {
  const auth = useAuth();
  return (
    <div>
      <button
        onClick={() => {
          auth.login('test', 'secret');
        }}
      >
        Login
      </button>
    </div>
  );
};
