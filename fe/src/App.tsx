import React, { FC } from 'react';
import { Route, Routes } from 'react-router';
import { Base } from './pages/Base';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { PostPage } from './pages/Post';
import { ProfilePage } from './pages/Profile';
import { SignupPage } from './pages/Signup';
import { RequireAuth } from './utils/Api';
import { NewPostPage } from './pages/NewPost';
import { Settings } from './pages/Settings';
import { EditPost } from './pages/EditPost';
import { AboutPage } from './pages/About';

const App: FC = () => {
  return (
    <div className="h-screen w-full">
      <Routes>
        <Route path="/" element={<Base />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
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
          <Route
            path=":postId/editpost"
            element={
              <RequireAuth>
                <EditPost />
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
