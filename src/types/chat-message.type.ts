import {type User} from '@/contracts/user/user.contrcact';

export type ChatMessage = {
  text: string;
  suggested: boolean
  author: User | null,
  createdAt: Date
  updatedAt: Date,
};
