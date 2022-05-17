import React, { FC, useEffect, useState } from 'react';
import { Searchbar } from '../components/Searchbar';
import { Spinner } from '../components/Spinner';
import { useAuth, useQuery } from '../utils/Api';

export const HomePage: FC = () => {
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
    return (
      <div className="w-full absolute flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }
  console.log(data);

  return (
    <div className="p-4 flex justify-center">
      <Searchbar
        onEnterPressed={(value) => {
          setSearchQuery(value);
        }}
      />
      <div className="w-[640px]">
        {data.map((post: any) => {
          console.log(post);

          return (
            <div className="p-4 mt-2 rounded-md border-2 flex flex-col justify-center">
              <div className="mr-auto ml-auto">
                <img className="max-h-[512px]" src={post.post_image_url} />
              </div>
              <div className="flex space-x-2">
                <p>{post.likes}</p>
                <p>{post.dislikes}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
