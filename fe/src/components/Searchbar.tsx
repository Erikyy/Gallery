import React, { FC, useState } from 'react';
import { MdSearch } from 'react-icons/md';

interface SearchbarProps {
  onEnterPressed: (value: string) => void;
}

export const Searchbar: FC<SearchbarProps> = ({ onEnterPressed }) => {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className="w-80 fixed z-20">
      <div className="pt-2 w-full relative mx-auto text-gray-600">
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="border-2 w-full border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('search');
              onEnterPressed(searchInput);
              setSearchInput(searchInput);
            }
          }}
        />
        <button className="absolute right-0 top-0 mt-5 mr-4">
          <MdSearch />
        </button>
      </div>
    </div>
  );
};
