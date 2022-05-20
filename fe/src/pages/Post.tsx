import React, { FC, useEffect } from 'react';
import { MdThumbDown, MdThumbsUpDown, MdThumbUp } from 'react-icons/md';
import { useLocation, useNavigate } from 'react-router';
import { IconButton } from '../components/IconButton';
import { Spinner } from '../components/Spinner';
import { Post } from '../models/Post';
import { useQuery } from '../utils/Api';

export const PostPage: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(
    `api/posts/${location.pathname.split('/')[1]}`,
    false
  );
  const post: Post = data;
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
    <div className="w-full h-full flex justify-center">
      <div className="w-full md:w-[840px] p-4 bg-slate-100 dark:bg-slate-600">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="text-xl dark:text-white">{post.title}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              Created At: {new Date(post.created_at).toLocaleDateString()}
            </p>
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
          <img
            className="md:w-[512px] w-auto h-max"
            src={post.post_image_url}
          />
        </div>
        <div className="pt-2 w-full">
          <p className="dark:text-white">{post.description}</p>
        </div>
        <div className="pt-2 flex space-x-2">
          <IconButton icon={<MdThumbUp size={22} />}>
            {post.number_of_dislikes}
          </IconButton>
          <IconButton icon={<MdThumbDown size={22} />}>
            {post.number_of_dislikes}
          </IconButton>
        </div>
      </div>
    </div>
  );
};
