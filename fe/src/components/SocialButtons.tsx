import React, { FC, useState } from 'react';
import { MdThumbUp, MdThumbDown } from 'react-icons/md';
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
        icon={<MdThumbUp color={hasLiked ? 'yellow' : 'white'} size={22} />}
      >
        {numberOfLikes}
      </IconButton>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          if (authenticated) {
            onDislikeClicked();
            if (hasLiked) {
              setNumberOfLikes(numberOfLikes - 1);
              setLiked(false);
            }
            if (hasDisliked) {
              setNumberOfDislikes(numberOfDislikes - 1);
            } else {
              setNumberOfDislikes(numberOfDislikes + 1);
            }
            setDisliked(!hasDisliked);
          }
        }}
        icon={
          <MdThumbDown color={hasDisliked ? 'yellow' : 'white'} size={22} />
        }
      >
        {numberOfDislikes}
      </IconButton>
    </div>
  );
};
