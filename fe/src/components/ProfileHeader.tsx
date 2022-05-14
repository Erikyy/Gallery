import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { useQuery, useRefresh } from '../utils/Api';

export const ProfileHeader: FC = () => {
  const [cookies] = useCookies(['access_token']);
  const navigate = useNavigate();
  const { refresh } = useRefresh();
  const { data, error, loading, fetchData } = useQuery(
    'api/users/me/',
    true,
    cookies.access_token
  );

  useEffect(() => {
    if (error) {
      refresh(() => {
        fetchData();
      });
    }
  }, [error]);
  if (loading || !data) {
    return null;
  }

  return (
    <div className="flex">
      <div className="h-full flex flex-col justify-center pr-2">
        <p>{data.user.username}</p>
      </div>
      <img
        onClick={() => {
          navigate('/profile');
        }}
        className="inline object-cover w-12 h-12 mr-2 rounded-full active:bg-slate-900 cursor-pointer hover:border-2 hover:border-slate-400"
        src={data && data.profile_image_url}
        alt="Profile image"
      />
    </div>
  );
};
