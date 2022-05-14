import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router';
import { Base } from './pages/Base';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Signup';
import { RequireAuth, useRefresh } from './utils/Api';

const App: FC = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<HomePage />} />
          <Route
            path="profile"
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
