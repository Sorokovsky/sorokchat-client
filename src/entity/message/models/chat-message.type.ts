import {type User} from '@/entity/user';

export type ChatMessage = {
  text: string;
  suggested: boolean
  author: User | null,
  createdAt: Date
  updatedAt: Date,
};
