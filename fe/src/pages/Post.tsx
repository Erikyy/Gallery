import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MdThumbDown, MdThumbsUpDown, MdThumbUp } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';
import { IconButton } from '../components/IconButton';
import { SocialButtons } from '../components/SocialButtons';
import { Spinner } from '../components/Spinner';
import { Post } from '../models/Post';
import { useAuth, useMutation, useQuery } from '../utils/Api';

export const PostPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const { mutate } = useMutation(true, cookies.access_token);
  const auth = useAuth();
  const { data, loading, error } = useQuery(
    `api/posts/${location.pathname.split('/')[1]}`,
    false,
    cookies.access_token
  );
  const post: Post = data;
  console.log(post);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (loading) {
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full justify-center">
      <div className="w-full p-4 bg-slate-100 dark:bg-slate-600">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="text-xl dark:text-white">{post.title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Created At: {new Date(post.created_at).toLocaleDateString()}
            </p>
            <div className="flex">
              <div className="h-full flex flex-col justify-center pr-2">
                <p className="dark:text-white">Author: {post.user.username}</p>
              </div>
              <img
                className="inline object-cover w-6 h-6 mr-2 rounded-full"
                src={post.user.avatar}
                alt="Profile image"
              />
            </div>
          </div>
          <button
            onClick={() => {
              navigate(-1);
            }}
            className="dark:text-white hover:bg-slate-500 p-3 rounded-lg"
          >
            Back
          </button>
        </div>
        <div className="w-full pt-2 flex justify-center">
          <img className="md:w-[512px] w-auto h-max" src={post.image} />
        </div>
        <div className="pt-2 w-full">
          <p className="dark:text-white">{post.description}</p>
        </div>
        <SocialButtons
          authenticated={auth.authenticated}
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
      </div>
    </div>
  );
};
