import {z as zod} from 'zod';
import {BaseSchema} from '@/contracts/utils/base.contract';
import {CreateChatSchema} from '@/contracts/chats/create-chat.contract';
import {UserSchema} from '@/contracts/user/user.contrcact';

export const ChatSchema = BaseSchema.extend(CreateChatSchema.shape).extend({
  members: UserSchema.array()
});

export type Chat = zod.infer<typeof ChatSchema>;
