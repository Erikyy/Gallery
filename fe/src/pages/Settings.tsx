import React, { FC, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useLogout, useMutation } from '../utils/Api';

export const Settings: FC = () => {
  const [open, setOpen] = useState(false);
  const { logout } = useLogout();
  const [cookies] = useCookies(['access_token']);
  const { mutate } = useMutation(true, cookies.access_token);
  const navigate = useNavigate();

  return (
    <div className="w-full mx-auto max-w-[1280px]">
      <h1 className="text-3xl dark:text-white">Settings</h1>
      <section className="pt-10">
        <h1 className="text-md dark:text-white">Delete account</h1>
        <button
          onClick={() => {
            setOpen(true);
          }}
          className="dark:text-white bg-red-500 hover:bg-red-600 p-3 rounded-lg"
        >
          Delete
        </button>
      </section>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div>
          <h1>Are you sure you want to delete your account?</h1>
          <div className="flex justify-between pt-4">
            <Button
              onClick={() => {
                mutate(
                  {},
                  {
                    path: `api/profile`,
                    onSuccess(res) {
                      logout(() => {
                        setOpen(false);
                        navigate('/');
                      });
                    },
                    onError(e) {},
                    overrideMethod: 'DELETE'
                  }
                );
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => {
                setOpen(false);
              }}
            >
              No
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
