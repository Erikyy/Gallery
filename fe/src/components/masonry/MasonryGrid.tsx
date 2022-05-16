import React, { FC } from 'react';

export const MasonryGrid: FC = ({ children }) => {
  return (
    <div className="relative flex flex-col justify-center py-6 sm:py-12">
      <div className="columns-2 2xl:columns-3 gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        {children}
      </div>
    </div>
  );
};
