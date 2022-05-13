import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { SideDrawer } from './components/drawer/SideDrawer';
import { Header } from './components/Header';
import { Base } from './pages/Base';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { SignupPage } from './pages/Signup';
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
        <Route path="/" element={<Base />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
