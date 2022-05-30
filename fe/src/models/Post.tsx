import { User } from './User';

export type Post = {
  _id: string;
  title: string;
  created_at: string;
  image: string;
  description: string;
  likes: User[];
  user: User;
};
