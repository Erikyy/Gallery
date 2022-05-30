import React, { FC } from 'react';

export const AboutPage: FC = () => {
  return (
    <div className="dark:text-white space-y-3 max-w-[1280px] pt-10 mx-auto text-center">
      <h1 className="text-xl">Welcome to Gallery!</h1>
      <p className="">
        This website is a basic gallery where user can post some images with
        details, can also view other posts. Techologies used for this project:
        NestJS for backend, MongoDB for database and React and TailwindCSS for
        frontend.
      </p>
    </div>
  );
};
