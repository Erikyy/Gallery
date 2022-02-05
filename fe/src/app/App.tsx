import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../common/components/Header';
import { Login } from '../pages/Login';
import AuthProvider from '../utils/auth';
import './App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
