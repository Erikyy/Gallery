import React, { FC, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { FileDrop } from '../components/forms/FileDrop';
import { Input } from '../components/forms/Input';
import { Textarea } from '../components/forms/Textarea';
import { Spinner } from '../components/Spinner';
import { RootState } from '../features/store';
import { Post } from '../models/Post';
import { useMutation, useQuery } from '../utils/Api';

export const EditPost: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);
  const { data, loading, error } = useQuery(
    `api/posts/${location.pathname.split('/')[1]}`,
    false,
    cookies.access_token
  );
  const { mutate } = useMutation(true, cookies.access_token, true);
  const userProfile = useSelector((state: RootState) => state.user.user);

  const post: Post = data;

  useEffect(() => {
    if (post) {
      if (post.user._id !== userProfile?._id) {
        navigate('/');
      }
    }
  }, [post]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = e.target.elements.title.value;
    const description = e.target.elements.description.value;
    const file = e.target.elements.image.files[0];

    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    mutate(formData, {
      path: `api/posts/${location.pathname.split('/')[1]}`,
      onError(e) {},
      onSuccess(res) {
        console.log('success');

        navigate(`/${location.pathname.split('/')[1]}`);
      },
      overrideMethod: 'PATCH'
    });
  };
  if (loading) {
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="w-full h-full flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-100 dark:bg-neutral-700 space-y-2 p-4 sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6"
      >
        <h1 className="text-neutral-700 dark:text-white">Edit {post.title}</h1>
        <Input
          defaultValue={post.title}
          id="title"
          label="Title"
          type={'text'}
        />
        <Textarea
          defaultValue={post.description}
          id="description"
          label="Description"
        />
        <FileDrop defaultValue={post.image} id="image" />
        <div className="flex justify-between">
          <Button type="submit">Save</Button>
          <Button
            onClick={() => {
              navigate(`/${location.pathname.split('/')[1]}`);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};
