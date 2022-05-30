import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Post } from '../models/Post';
import { useQuery, useMutation, useAuth } from '../utils/Api';
import { PostItem } from './list/PostItem';
import { PostList } from './list/PostList';
import { Spinner } from './Spinner';

interface PostsProps {
  searchQuery: string;
  orderBy: string;
  sort: string;
}

export const Posts: FC<PostsProps> = ({ searchQuery, orderBy, sort }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const { data, loading, error, fetchData } = useQuery(
    `api/posts?s=${searchQuery}&order_by=${orderBy}&sort=${sort}`,
    false,
    cookies.access_token
  );
  const { mutate } = useMutation(true, cookies.access_token);
  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, [searchQuery, orderBy, sort]);

  if (loading) {
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  return (
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
  );
};
