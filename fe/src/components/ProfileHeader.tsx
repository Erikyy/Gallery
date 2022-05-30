import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RootState } from '../features/store';
import { useQuery } from '../utils/Api';

export const ProfileHeader: FC = () => {
  const navigate = useNavigate();
  const userProfile = useSelector((state: RootState) => state.user.user);
  if (!userProfile) {
    return null;
  }

  return (
    <div className="flex">
      <div className="h-full flex flex-col justify-center pr-2">
        <p className="dark:text-white">{userProfile.username}</p>
      </div>
      <img
        onClick={() => {
          navigate('/profile');
        }}
        className="inline object-cover w-12 h-12 mr-2 rounded-full active:bg-slate-900 cursor-pointer hover:border-2 hover:border-slate-400"
        src={userProfile.avatar}
        alt="Profile image"
      />
    </div>
  );
};
