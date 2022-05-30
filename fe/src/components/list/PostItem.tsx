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
      className="p-4 cursor-pointer rounded-md border-2 bg-slate-100 dark:bg-slate-600 dark:border-slate-600 dark:hover:border-slate-500 flex flex-col justify-center break-inside-avoid"
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
