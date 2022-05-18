import React, { FC, useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';

const api_url = 'http://localhost:8000';

export const useQuery = (
  path: string,
  requireAuth: boolean,
  token?: string
) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(undefined);

  const authheaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  });
  const normalheaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  const fetchData = async () => {
    setLoading(true);

    const res = fetch(`${api_url}/${path}`, {
      method: 'get',
      headers: requireAuth ? authheaders : normalheaders
    });
    res
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        const data = await response.json();
        throw new Error(JSON.stringify(data));
      })
      .then((jsondata) => {
        setData(jsondata);
        setLoading(false);
      })
      .catch((err) => {
        console.log(JSON.parse(err.message));

        setError(JSON.parse(err.message));
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { data, loading, error, fetchData };
};

const useMutation = (requireAuth: boolean, token?: string) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);

  const mutate = async (
    data: any,
    options: {
      path: string;
      onSuccess: (result: any) => void;
      onError: (err: any) => void;
    }
  ) => {
    const authheaders = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    const normalheaders = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    setLoading(true);
    setError(undefined);
    const res = fetch(`${api_url}/${options.path}`, {
      method: 'post',
      headers: requireAuth ? authheaders : normalheaders,
      body: JSON.stringify(data)
    });
    res
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }
        const data = await response.json();
        throw new Error(JSON.stringify(data));
      })
      .then((jsondata) => {
        setData(jsondata);
        setLoading(false);
        options.onSuccess(jsondata);
      })
      .catch((err) => {
        console.log(JSON.parse(err.message));

        setError(JSON.parse(err.message));
        setLoading(false);
      });
  };

  return { mutate, data, loading, error };
};

export const useRefresh = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);
  const navigate = useNavigate();

  const { mutate, error, data, loading } = useMutation(
    true,
    cookies.refresh_token
  );

  const refresh = (onSuccess: () => void) => {
    mutate(
      {
        refresh: cookies.refresh_token
      },
      {
        path: 'api/auth/jwt/refresh/',
        onSuccess(res) {
          setCookie('access_token', res.access);
          onSuccess();
        },
        onError(err) {
          navigate('/login');
        }
      }
    );
  };

  return { refresh };
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

  const login = (username: string, password: string, onSuccess: () => void) => {
    mutate(
      {
        username: username,
        password: password
      },
      {
        path: 'api/auth/jwt/create/',
        onSuccess(result) {
          setCookie('access_token', result.access);
          setCookie('refresh_token', result.refresh);
          onSuccess();
        },
        onError(err) {
          console.log(err);
        }
      }
    );
  };
  return { login, loading, error };
};

export const useSignup = () => {
  const { mutate, data, error, loading } = useMutation(false);
  const signup = (
    data: { email: string; username: string; password: string },
    onSuccess: () => void
  ) => {
    mutate(data, {
      path: 'api/auth/users/',
      onSuccess() {
        onSuccess();
      },
      onError(err) {
        console.log(err);
      }
    });
  };
  return { signup, loading, error };
};

export const useLogout = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);

  const { mutate, data, error, loading } = useMutation(
    true,
    cookies.access_token
  );

  const logout = (onSuccess: () => void) => {
    removeCookie('access_token');
    removeCookie('refresh_token');
    onSuccess();
  };
  return { logout };
};

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);

  if (
    !cookies.access_token ||
    !cookies.refresh_token ||
    (cookies.access_token === 'undefined' &&
      cookies.refresh_token === 'undefined')
  ) {
    return {
      authenticated: false
    };
  } else {
    return { authenticated: true };
  }
};

export const RequireAuth: FC = ({ children }) => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([
    'access_token',
    'refresh_token'
  ]);
  if (
    !cookies.access_token ||
    !cookies.refresh_token ||
    (cookies.access_token === 'undefined' &&
      cookies.refresh_token === 'undefined')
  ) {
    navigate('/login');
  }
  return <>{children}</>;
};
