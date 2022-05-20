import { User } from './User';

export type Post = {
  title: string;
  created_at: string;
  post_image_url: string;
  post_id: string;
  description: string;
  number_of_likes: number;
  number_of_dislikes: number;
  user: User;
  has_liked: boolean;
  has_disliked: boolean;
};
