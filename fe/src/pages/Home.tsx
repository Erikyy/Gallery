import React, { FC } from 'react';
import { Spinner } from '../components/Spinner';
import { useAuth, useQuery } from '../utils/Api';

export const HomePage: FC = () => {
  const { data, loading, error } = useQuery('api/posts/', false);

  const auth = useAuth();

  if (loading) {
    return <Spinner />;
  }
  console.log(data);

  return (
    <div className="relative flex min-h-screen flex-col justify-center py-6 sm:py-12">
      <div className="columns-2 2xl:columns-3 gap-10 [column-fill:_balance] box-border mx-auto before:box-inherit after:box-inherit">
        <div className="break-inside-avoid p-8 mb-6 bg-gray-100 rounded-lg">
          <p>Really" long content</p>
        </div>
        <div className="break-inside-avoid p-8 mb-6 bg-gray-100 rounded-lg">
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
        </div>
        <div className="break-before-avoid p-8 mb-6 bg-gray-100 rounded-lg">
          <p>Really long content</p>
          <p>Really long content</p>
        </div>
        <div className="break-inside-avoid p-8 mb-6 bg-gray-100 rounded-lg">
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
        </div>
        <div className="break-inside-avoid p-8 mb-6 bg-gray-100 rounded-lg">
          <p>Really long content</p>
          <p>Really long content</p>
          <p>Really long content</p>
        </div>
      </div>
    </div>
  );
};
