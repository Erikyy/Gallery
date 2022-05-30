import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { Route, Routes } from 'react-router';
import { Base } from './pages/Base';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { PostPage } from './pages/Post';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Signup';
import { RequireAuth, useQuery } from './utils/Api';
import { setUser } from './features/user/UserSlice';
import { useDispatch } from 'react-redux';
import { NewPostPage } from './pages/NewPost';
import { Settings } from './pages/Settings';
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
          <Route
            path="settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="newpost"
            element={
              <RequireAuth>
                <NewPostPage />
              </RequireAuth>
            }
          />
          <Route path=":postId" element={<PostPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  );
};

export default App;
