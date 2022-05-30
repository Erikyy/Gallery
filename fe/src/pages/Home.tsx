import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { MdAdd } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { PostItem } from '../components/list/PostItem';
import { PostList } from '../components/list/PostList';
import { Searchbar } from '../components/Searchbar';
import { Spinner } from '../components/Spinner';
import { Post } from '../models/Post';
import { useAuth, useMutation, useQuery } from '../utils/Api';

export const HomePage: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [cookies] = useCookies(['access_token']);
  const { data, loading, error, fetchData } = useQuery(
    `api/posts`,
    false,
    cookies.access_token
  );
  const { mutate } = useMutation(true, cookies.access_token);
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
    <div className="p-4 space-y-9">
      <div className="w-full justify-between flex p-4 rounded-lg bg-slate-100 dark:bg-slate-600">
        <Searchbar
          onEnterPressed={(value) => {
            setSearchQuery(value);
          }}
        />
        {auth.authenticated && (
          <button
            onClick={() => {
              navigate('/newpost');
            }}
            className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-500"
          >
            <MdAdd size={24} className="dark:text-white" />
          </button>
        )}
      </div>
      <PostList>
        {data.map((post: Post) => {
          return (
            <PostItem
              hasAuthenticated={auth.authenticated}
              key={post._id}
              onClick={(postId: string) => {
                navigate(`/${postId}`);
              }}
              onLikeClicked={() => {
                if (auth.authenticated) {
                  mutate(
                    {},
                    {
                      path: `api/posts/${post._id}`,
                      onError(err) {
                        console.log(err);
                      },
                      onSuccess(res) {
                        console.log(res);
                      }
                    }
                  );
                }
              }}
              post={post}
            />
          );
        })}
      </PostList>
    </div>
  );
};
