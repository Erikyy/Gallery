import React, { FC, useEffect, useRef, useState } from 'react';
import { MdHome, MdLogout, MdMenu, MdSettings } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { useAuth, useLogout } from '../../utils/Api';
import { ThemeSwitch } from '../../utils/ThemeSwitch';
import { Drawer } from './Drawer';
import { DrawerItem, DrawerItemGeneric } from './DrawerItem';

export const SideDrawer: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const drawerRef = useRef<any>(null);
  const auth = useAuth();
  const { logout } = useLogout();
  const navigate = useNavigate();
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);
  const toggle = () => {
    setOpen(!isOpen);
  };
  return (
    <div className="flex flex-col justify-center h-full">
      <button
        onClick={toggle}
        className="bg-none p-4 dark:text-slate-100 border-none"
      >
        <MdMenu size={24} />
      </button>
      <Drawer drawerRef={drawerRef} isOpen={isOpen}>
        <div className="flex-1">
          <DrawerItem icon={<MdHome size={24} />}>Home</DrawerItem>
          <DrawerItem icon={<MdSettings size={24} />}>Settings</DrawerItem>
        </div>
        <div className="flex-2">
          <DrawerItemGeneric>
            <ThemeSwitch />
          </DrawerItemGeneric>
          {auth.authenticated && (
            <DrawerItem
              onClick={() => {
                logout(() => {
                  navigate('/');
                });
              }}
              icon={<MdLogout size={24} />}
            >
              Logout
            </DrawerItem>
          )}
        </div>
      </Drawer>
    </div>
  );
};
