import React, { FC, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const api_url = 'http://localhost:8000';

const useQuery = (path: string, requireAuth: boolean) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${api_url}/${path}`);
        const jsondata = await res.json();
        setData(jsondata);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchData();
  }, []);
  return { data, loading, error };
};

const useMutation = (requireAuth: boolean, token?: string) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  const mutate = async (
    data: any,
    options: { path: string; onSuccess: (result: any) => void }
  ) => {
    setLoading(true);
    try {
      const res = await fetch(`${api_url}/${options.path}`, {
        method: 'post',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }),
        body: JSON.stringify(data)
      });
      const jsondata = await res.json();
      setData(jsondata);
      setLoading(false);
      options.onSuccess(jsondata);
    } catch (e) {
      setError(e);
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
};

export const useLogin = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);

  const { mutate, data, error, loading } = useMutation(
    false,
    cookies.access_token
  );

  const login = (username: string, password: string) => {
    mutate(
      {
        username: username,
        password: password
      },
      {
        path: 'api/auth/jwt/create/',
        onSuccess(result) {
          console.log(result);
          setCookie('access_token', result.access);
          setCookie('refresh_token', result.refresh);
        }
      }
    );
  };
  return { login, loading, error };
};

const useLogout = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);

  const { mutate, data, error, loading } = useMutation(
    true,
    cookies.access_token
  );

  return {};
};

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);

  if (!cookies.access_token && !cookies.refresh_token) {
    return {
      authenticated: false
    };
  }
  return { authenticated: true };
};

export const RequireAuth: FC = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);
  if (!cookies.access_token && !cookies.refresh_token) {
    navigate('/login');
  }
  return <>{children}</>;
};
