import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { SideDrawer } from './components/drawer/SideDrawer';
import { Header } from './components/Header';
import { HomePage } from './pages/Home';
import { useLogin } from './utils/Api';

const App: FC = () => {
  const { loading, login } = useLogin();
  useEffect(() => {
    login('erik', 'password');
  }, []);
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  );
};

export default App;
