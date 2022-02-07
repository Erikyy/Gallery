import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from '../common/components/Header';
import { Login } from '../pages/Login';
import AuthProvider from '../utils/auth';
import { ThemeProvider } from '../utils/ThemeProvider';
import './App.css';

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ThemeProvider>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
