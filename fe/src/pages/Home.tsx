import React, { FC, useEffect, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { PostItem } from '../components/list/PostItem';
import { PostList } from '../components/list/PostList';
import { Searchbar } from '../components/Searchbar';
import { Spinner } from '../components/Spinner';
import { Post } from '../models/Post';
import { useAuth, useQuery } from '../utils/Api';

export const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, fetchData } = useQuery(
    `api/posts?search=${searchQuery}&page=1&order_by=created_at&sort=desc`,
    false
  );
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, [searchQuery]);
  if (loading) {
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-4 flex justify-center">
      <PostList>
        <div className="w-full justify-between flex p-4 rounded-lg bg-slate-100 dark:bg-slate-600">
          <Searchbar
            onEnterPressed={(value) => {
              setSearchQuery(value);
            }}
          />
          {auth.authenticated && (
            <button className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500">
              <MdAdd size={24} className="dark:text-white" />
            </button>
          )}
        </div>
        {data.map((post: Post) => {
          return (
            <PostItem
              key={post.post_id}
              onClick={(postId: string) => {
                navigate(`/${postId}`);
              }}
              post={post}
            />
          );
        })}
      </PostList>
    </div>
  );
};
