import React, { FC, useEffect } from 'react';
import { SideDrawer } from './components/drawer/SideDrawer';
import { Header } from './components/Header';
import { useLogin } from './utils/Api';

const App: FC = () => {
  const { loading, login } = useLogin();
  useEffect(() => {
    login('erik', 'password');
  }, []);
  return (
    <div className="">
      <Header />
    </div>
  );
};

export default App;
