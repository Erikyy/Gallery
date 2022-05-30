import React, { FC, useState } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { Post } from '../models/Post';
import { IconButton } from './IconButton';

interface SocialButtonsProps {
  onLikeClicked: () => void;
  post: Post;
  authenticated: boolean;
}

export const SocialButtons: FC<SocialButtonsProps> = ({
  onLikeClicked,
  post,
  authenticated
}) => {
  const [numberOfLikes, setNumberOfLikes] = useState(post.likes.length);

  const [hasLiked, setLiked] = useState(false);
  return (
    <div className="pt-2 flex space-x-2">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          if (authenticated) {
            onLikeClicked();

            if (hasLiked) {
              setNumberOfLikes(numberOfLikes - 1);
            } else {
              setNumberOfLikes(numberOfLikes + 1);
            }

            setLiked(!hasLiked);
          }
        }}
        icon={
          hasLiked ? (
            <MdFavorite color="#e3094a" size={22} />
          ) : (
            <MdFavoriteBorder color="white" size={22} />
          )
        }
      >
        {numberOfLikes}
      </IconButton>
    </div>
  );
};
