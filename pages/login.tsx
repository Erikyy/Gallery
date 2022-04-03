import { NextPage } from 'next';
import { Forms } from '../components';

const LoginForm = Forms.LoginForm;

const Login: NextPage = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Login;
