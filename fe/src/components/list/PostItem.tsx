import React, { FC, useEffect, useRef, useState } from 'react';
import { MdThumbDown, MdThumbUp } from 'react-icons/md';
import { Post } from '../../models/Post';
import { IconButton } from '../IconButton';

interface PostItemProps {
  post: Post;
  onClick: (postId: string) => void;
  onLikeClicked: () => void;
  onDislikeClicked: () => void;
}

export const PostItem: FC<PostItemProps> = ({
  post,
  onClick,
  onLikeClicked,
  onDislikeClicked
}) => {
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
      <div className="pt-2 flex space-x-2">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onLikeClicked();
          }}
          icon={
            <MdThumbUp color={post.has_liked ? 'yellow' : 'white'} size={22} />
          }
        >
          {post.number_of_likes}
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            onDislikeClicked();
          }}
          icon={
            <MdThumbDown
              color={post.has_disliked ? 'yellow' : 'white'}
              size={22}
            />
          }
        >
          {post.number_of_dislikes}
        </IconButton>
      </div>
    </div>
  );
};
