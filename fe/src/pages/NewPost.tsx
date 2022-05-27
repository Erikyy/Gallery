import React, { FC } from 'react';
import { Input } from '../components/forms/Input';

export const NewPostPage: FC = () => {
  return (
    <div>
      <form>
        <Input id="title" label="Title" type="text" />
        <textarea />
      </form>
    </div>
  );
};
