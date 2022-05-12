import React, { FC, useEffect } from 'react';
import { Header } from './components/Header';
import { useLogin } from './utils/Api';

const App: FC = () => {
  const { loading, login } = useLogin();
  useEffect(() => {
    login('erik', 'Maastik900');
  }, []);
  return (
    <div className="">
      <Header />
    </div>
  );
};

export default App;
