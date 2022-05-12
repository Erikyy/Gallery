import React, { FC, useState } from 'react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';
import { motion } from 'framer-motion';

export const ThemeSwitch: FC = () => {
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

  if (isOn) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }

  return (
    <div
      onClick={toggle}
      className={`flex-start flex h-[30px] w-[60px] rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
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
            <MdLightMode className="text-slate-200" />
          ) : (
            <MdDarkMode className="text-slate-200" />
          )}
        </div>
      </motion.div>
    </div>
  );
};
