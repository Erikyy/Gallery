import React, { FC } from 'react';
import { Input } from '../components/forms/Input';
import { Textarea } from '../components/forms/Textarea';

export const NewPostPage: FC = () => {
  return (
    <div className="w-full h-full flex justify-center ">
      <form className="bg-slate-100 p-4 sm:w-2/3 md:w-3/6 lg:w-2/6 xl:w-2/6 2xl:w-2/6">
        <Input id="title" label="Title" type={'text'} />
        <Textarea id="description" label="Description" />
      </form>
    </div>
  );
};
