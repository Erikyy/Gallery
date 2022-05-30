import React, { FC, useState } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchbarProps {
  value: string;
  onChange: (e: any) => void;
}

export const Searchbar: FC<SearchbarProps> = ({ value, onChange }) => {
  return (
    <div className="w-80">
      <div className="w-full relative mx-auto text-gray-600">
        <input
          value={value}
          onChange={onChange}
          className="border-1 w-full border-neutral-300 dark:border-neutral-400 bg-white dark:bg-neutral-600 dark:text-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="Search..."
        />
        <button className="absolute right-0 top-0 mt-3 mr-4">
          <MdSearch />
        </button>
      </div>
    </div>
  );
};
