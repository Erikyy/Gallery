import React, { FC, useEffect, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setMode } from '../features/theme/ThemeSlice';

export const ThemeSwitch: FC = () => {
  const dispatch = useDispatch();
  const [isOn, setOn] = useState<boolean>(() => {
    if (localStorage.getItem('theme') === 'light') {
      return true;
    } else {
      return false;
    }
  });

  const toggle = () => {
    setOn(!isOn);
  };

  useEffect(() => {
    if (isOn) {
      dispatch(setMode('dark'));
    } else {
      dispatch(setMode('light'));
    }
  }, [isOn]);

  if (isOn) {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  }

  return (
    <div className="flex flex-row align-middle">
      <div
        onClick={toggle}
        className={`border border-neutral-300 dark:border-neutral-600 flex-start flex h-[30px] w-[60px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
          isOn && 'place-content-end'
        }`}
      >
        <motion.div
          className="flex h-[20px] w-[20px] items-center justify-center rounded-full bg-black/90"
          layout
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100
          }}
        >
          <div>
            {isOn ? (
              <MdDarkMode className="text-slate-200" />
            ) : (
              <MdLightMode className="text-slate-200" />
            )}
          </div>
        </motion.div>
      </div>
      <span className=" p-1 text-center">
        {isOn ? 'Light Mode' : 'Dark Mode'}
      </span>
    </div>
  );
};
