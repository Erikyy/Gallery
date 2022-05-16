import React, { FC } from 'react';

export const MasonryItem: FC = ({ children }) => {
  return (
    <div className="break-inside-avoid p-8 mb-6 bg-gray-100 rounded-lg">
      {children}
    </div>
  );
};
