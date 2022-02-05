import { createContext, FC, useContext } from 'react';
import { useCookies } from 'react-cookie';

export const useAuthToken = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['access_token']);

  const setAuthToken = (token: string) => setCookie('access_token', token);
  const removeAuthToken = () => removeCookie('access_token');

  return [cookies.access_token, setAuthToken, removeAuthToken];
};

interface AuthContextProps {
  login: (username: string, password: string) => void;
  logout: () => void;
  signup: (username: string, password: string, email: string) => void;
  refresh: () => void;
}

const AuthContext = createContext<AuthContextProps>(null!);

const AuthProvider: FC = ({ children }) => {
  const login = async (username: string, password: string) => {
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });
  };
  const logout = async () => {};
  const signup = async (username: string, password: string, email: string) => {};
  const refresh = async () => {};
  const value = { login, logout, signup, refresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
