import React, { FC, useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { MasonryGrid } from '../components/masonry/MasonryGrid';
import { MasonryItem } from '../components/masonry/MasonryItem';
import { Spinner } from '../components/Spinner';
import { useAuth, useQuery } from '../utils/Api';

export const HomePage: FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { data, loading, error, fetchData } = useQuery(
    `api/posts?search=${searchQuery}&page=1&order_by=created_at&sort=desc`,
    false
  );

  const auth = useAuth();

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  if (loading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div className="p-4">
      <div className="flex rounded-full border-grey-light border">
        <button>
          <span className="w-auto flex justify-end items-center text-grey p-2">
            <MdSearch />
          </span>
        </button>
        <input
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
          className="w-full shadow-none focus:outline-none bg-transparent border-0 mr-4"
          type="text"
          placeholder="Search..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              console.log('search');

              setSearchQuery(searchInput);
            }
          }}
        />
      </div>
      <MasonryGrid>
        {data.map((post: any) => {
          return (
            <MasonryItem>
              <div className="w-1/2 h-auto">
                <img className="" src={post.post_image_url} />
              </div>
            </MasonryItem>
          );
        })}
      </MasonryGrid>
    </div>
  );
};
