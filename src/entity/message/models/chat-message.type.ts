import {type User} from '@/entity/user/model/user.contrcact';

export type ChatMessage = {
  text: string;
  suggested: boolean
  author: User | null,
  createdAt: Date
  updatedAt: Date,
};
