import React, { FC, useEffect, useState } from 'react';
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { RootState } from '../features/store';
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
  const userProfile = useSelector((state: RootState) => state.user.user);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const [hasLiked, setLiked] = useState(false);

  useEffect(() => {
    const isInLikes = post.likes.includes(userProfile ? userProfile.id : '');
    setLiked(isInLikes);
  }, [post.likes]);
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
            <MdFavoriteBorder
              color={theme === 'light' ? 'black' : 'white'}
              size={22}
            />
          )
        }
      >
        {numberOfLikes}
      </IconButton>
    </div>
  );
};
