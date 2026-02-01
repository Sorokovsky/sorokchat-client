import {User} from '@/contracts/user.contrcact';

export type ChatMessage = {
  author: User | null;
  text: string;
  suggested: boolean;
  createdAt: Date;
  updatedAt: Date;
}
