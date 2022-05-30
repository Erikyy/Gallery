import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { Posts } from '../components/Posts';
import { Searchbar } from '../components/Searchbar';
import { Select } from '../components/Select';
import { useAuth } from '../utils/Api';

export const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postsSort, setPostsSort] = useState({
    orderBy: 'created_at',
    sort: 'desc'
  });
  const navigate = useNavigate();
  const auth = useAuth();

  return (
    <div className="p-4 space-y-9">
      <div className="w-full justify-between flex space-x-2 p-4 rounded-lg bg-neutral-100 dark:bg-neutral-700">
        <div className="flex pt-2 space-x-2">
          <Searchbar
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <Select
            onChange={(e) => {
              setPostsSort({
                orderBy: e.target.value.split(',')[0],
                sort: e.target.value.split(',')[1]
              });
            }}
          >
            <option selected value={['created_at', 'desc']}>
              New posts
            </option>
            <option value={['created_at', 'asc']}>Older posts</option>
            <option value={['likes', 'desc']}>Most liked</option>
            <option value={['likes', 'asc']}>Least liked</option>
          </Select>
        </div>

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
      <Posts
        orderBy={postsSort.orderBy}
        sort={postsSort.sort}
        searchQuery={searchQuery}
      />
    </div>
  );
};
