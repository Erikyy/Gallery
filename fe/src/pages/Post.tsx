import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { MdThumbDown, MdThumbsUpDown, MdThumbUp } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { IconButton } from '../components/IconButton';
import { SocialButtons } from '../components/SocialButtons';
import { Spinner } from '../components/Spinner';
import { RootState } from '../features/store';
import { Post } from '../models/Post';
import { useAuth, useMutation, useQuery } from '../utils/Api';

export const PostPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const { mutate } = useMutation(true, cookies.access_token);
  const auth = useAuth();
  const userProfile = useSelector((state: RootState) => state.user.user);
  const { data, loading, error } = useQuery(
    `api/posts/${location.pathname.split('/')[1]}`,
    false,
    cookies.access_token
  );
  const post: Post = data;
  console.log(post);

  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(userProfile);
  }, []);
  if (loading) {
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col justify-between  p-4">
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
          <div className="flex space-x-2">
            {post.user._id === userProfile?._id && (
              <div className="flex space-x-2">
                <button className="dark:text-white bg-red-500 hover:bg-red-600 p-3 rounded-lg">
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigate(`/${location.pathname.split('/')[1]}/editpost`);
                  }}
                  className="dark:text-white hover:bg-neutral-500 p-3 rounded-lg"
                >
                  edit
                </button>
              </div>
            )}
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="dark:text-white hover:bg-neutral-500 p-3 rounded-lg"
            >
              Back
            </button>
          </div>
        </div>
        <div className="w-full pt-2 flex justify-center">
          <img className="md:w-[512px] w-auto h-full" src={post.image} />
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
