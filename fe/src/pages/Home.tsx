import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Posts } from '../components/Posts';
import { Searchbar } from '../components/Searchbar';
import { useAuth } from '../utils/Api';

export const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="p-4 space-y-9">
      <div className="w-full justify-between flex p-4 rounded-lg bg-neutral-100 dark:bg-neutral-700">
        <Searchbar
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        {auth.authenticated && (
          <button
            onClick={() => {
              navigate('/newpost');
            }}
            className="p-2 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-500"
          >
            <MdAdd size={24} className="dark:text-white" />
          </button>
        )}
      </div>
      <Posts searchQuery={searchQuery} />
    </div>
  );
};
