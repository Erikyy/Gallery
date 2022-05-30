import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { setUser } from '../features/user/UserSlice';
import { useQuery } from '../utils/Api';

export const Base: FC = () => {
  const [cookies] = useCookies(['access_token']);
  const dispatch = useDispatch();

  const { data, error, loading, fetchData } = useQuery(
    'request/user',
    true,
    cookies.access_token
  );

  useEffect(() => {
    if (data) {
      dispatch(setUser(data));
    }
  }, [data]);
  return (
    <div className="w-full m-0">
      <div className="absolute mt-0">
        <Header />
      </div>

      <div className="pt-16">
        <Outlet />
      </div>
    </div>
  );
};
