import React, { FC, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { FileDrop } from '../components/forms/FileDrop';
import { Input } from '../components/forms/Input';
import { Textarea } from '../components/forms/Textarea';
import { useMutation } from '../utils/Api';

export const NewPostPage: FC = () => {
  const [tempData, setTempData] = useState<any>(undefined);
  const navigate = useNavigate();
  const [cookies] = useCookies(['access_token']);

  const { mutate, data, error, loading } = useMutation(
    true,
    cookies.access_token,
    true
  );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: e.target.elements.title.value,
      description: e.target.elements.description.value,
      post_image: e.target.elements.image.files[0]
    };
    console.log(data);

    formData.append('title', e.target.elements.title.value);
    formData.append('description', e.target.elements.description.value);
    formData.append('file', e.target.elements.image.files[0]);

    mutate(formData, {
      path: 'api/posts',
      onSuccess(res) {
        navigate('/');
      },
      onError(err) {}
    });
  };

  return (
    <div className="w-full h-full flex justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-100 dark:bg-slate-600 space-y-2 p-4 sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6"
      >
        <h1 className="text-gray-700 dark:text-white">Add new post</h1>
        <Input id="title" label="Title" type={'text'} />
        <Textarea id="description" label="Description" />
        <FileDrop id="image" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
