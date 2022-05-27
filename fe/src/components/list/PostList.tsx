import React, { FC } from 'react';

export const PostList: FC = ({ children }) => {
  return (
    <div className="max-w-[1280px] gap-3 mx-auto space-y-3 columns-1 sm:columns-2 md:columns-2 lg:columns-3 xl:columns-4">
      {children}
    </div>
  );
};
