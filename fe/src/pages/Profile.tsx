import React, { FC } from 'react';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Button } from '../components/Button';
import { Input } from '../components/forms/Input';
import { RootState } from '../features/store';
import { useMutation } from '../utils/Api';

export const ProfilePage: FC = () => {
  const [cookies] = useCookies(['access_token']);
  const { mutate, data, error, loading } = useMutation(
    true,
    cookies.access_token,
    true
  );
  const userProfile = useSelector((state: RootState) => state.user.user);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const file = e.target.elements.image.files[0];
    const username = e.target.elements.username.value;
    const email = e.target.elements.email.value;
    const password = e.target.elements.newPassword.value;

    const formData = new FormData(e.currentTarget);
    formData.append('file', file);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    mutate(formData, {
      path: 'api/profile',
      onSuccess(res) {
        window.location.reload();
      },
      onError(err) {},
      overrideMethod: 'PATCH'
    });
  };
  if (!userProfile) {
    return null;
  }

  return (
    <div className="p-8 mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <img
            className="inline object-cover w-32 h-32 mr-2 rounded-full"
            src={userProfile.avatar}
            alt="Profile image"
          />
          <input id="image" type="file" />
        </div>
        <div className="max-w-sm">
          <Input id="username" label="Username" type="text" />
          <Input id="email" label="Email" type="email" />
          <Input id="newPassword" label="New Password" type="password" />
          <Input
            id="confirmNewPassword"
            label="Confirm New Password"
            type="password"
          />
        </div>
        <div className="mt-4">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};
