import React, { FC, useState } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchbarProps {
  value: string;
  onChange: (e: any) => void;
}

export const Searchbar: FC<SearchbarProps> = ({ value, onChange }) => {
  return (
    <div className="w-80">
      <div className="pt-2 w-full relative mx-auto text-gray-600">
        <input
          value={value}
          onChange={onChange}
          className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="Search..."
        />
        <button className="absolute right-0 top-0 mt-5 mr-4">
          <MdSearch />
        </button>
      </div>
    </div>
  );
};
