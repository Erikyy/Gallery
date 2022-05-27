import React, { FC, useState } from 'react';
import {
  MdThumbUp,
  MdThumbDown,
  MdFavoriteBorder,
  MdFavorite
} from 'react-icons/md';
import { Post } from '../models/Post';
import { IconButton } from './IconButton';

interface SocialButtonsProps {
  onLikeClicked: () => void;
  onDislikeClicked: () => void;
  post: Post;
  authenticated: boolean;
}

export const SocialButtons: FC<SocialButtonsProps> = ({
  onLikeClicked,
  onDislikeClicked,
  post,
  authenticated
}) => {
  const [numberOfLikes, setNumberOfLikes] = useState(post.number_of_likes);
  const [numberOfDislikes, setNumberOfDislikes] = useState(
    post.number_of_dislikes
  );
  const [hasLiked, setLiked] = useState(post.has_liked);
  const [hasDisliked, setDisliked] = useState(post.has_disliked);
  return (
    <div className="pt-2 flex space-x-2">
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          if (authenticated) {
            onLikeClicked();
            if (hasDisliked) {
              setNumberOfDislikes(numberOfDislikes - 1);
              setDisliked(false);
            }

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
