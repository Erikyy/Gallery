import React, { FC, useEffect, useRef, useState } from 'react';
import { Post } from '../../models/Post';

interface PostItemProps {
  post: Post;
  onClick: (postId: string) => void;
}

export const PostItem: FC<PostItemProps> = ({ post, onClick }) => {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [showFullButton, setShowFullButton] = useState(false);

  useEffect(() => {
    if (imageRef.current) {
      if (imageRef.current.height > 512) {
        setShowFullButton(true);
      } else {
        setShowFullButton(false);
      }
    }
  }, []);
  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        onClick(post.post_id);
      }}
      className="p-4 cursor-pointer mt-2 rounded-md border-2 bg-slate-100 dark:bg-slate-600 dark:border-slate-600 dark:hover:border-slate-500 flex flex-col justify-center"
    >
      <div>
        <h1 className="dark:text-white">{post.title}</h1>
      </div>
      <div className="relative p-4 mr-auto ml-auto max-h-[512px] overflow-hidden">
        <img ref={imageRef} className="" src={post.post_image_url} />

        {showFullButton && (
          <div className="absolute bottom-2 w-full text-white text-center">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClick(post.post_id);
              }}
              className="bg-black/[.7] hover:bg-black/[.6] p-2 pr-16 pl-16 rounded-xl"
            >
              SEE FULL IMAGE
            </button>
          </div>
        )}
      </div>
      <div className="flex pt-4 space-x-2">
        <p className="dark:text-white">{post.likes}</p>
        <p className="dark:text-white">{post.dislikes}</p>
      </div>
    </div>
  );
};
