import React, { FC, useEffect, useRef, useState } from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { Post } from '../../models/Post';
import { IconButton } from '../IconButton';
import { SocialButtons } from '../SocialButtons';

interface PostItemProps {
  hasAuthenticated: boolean;
  post: Post;
  onClick: (postId: string) => void;
  onLikeClicked: () => void;
}

export const PostItem: FC<PostItemProps> = ({
  post,
  onClick,
  onLikeClicked,
  hasAuthenticated
}) => {
  const imageRef = useRef<HTMLImageElement | null>(null);

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(post._id);
      }}
      className="p-4 cursor-pointer rounded-md border-2 bg-neutral-100 dark:bg-neutral-700 dark:border-neutral-700 dark:hover:border-neutral-600 flex flex-col justify-center break-inside-avoid"
    >
      <div>
        <h1 className="dark:text-white">{post.title}</h1>
      </div>
      <div className="relative p-4 mr-auto ml-auto overflow-hidden">
        <img ref={imageRef} className="" src={post.image} />
      </div>
      <SocialButtons
        authenticated={hasAuthenticated}
        onLikeClicked={() => {
          onLikeClicked();
        }}
        post={post}
      />
    </div>
  );
};
