import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from '../features/Login/Login';
import AuthProvider from '../utils/auth';
import './App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <h1>hello</h1>
        </div>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
