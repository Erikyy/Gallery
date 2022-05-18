import { User } from './User';

export type Post = {
  title: string;
  created_at: string;
  post_image_url: string;
  post_id: string;
  description: string;
  likes: number;
  dislikes: number;
  user: User;
};
