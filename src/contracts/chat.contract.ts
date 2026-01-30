import {z as zod} from 'zod';
import {BaseSchema} from '@/contracts/base.contract';
import {CreateChatSchema} from '@/contracts/create-chat.contract';
import {UserSchema} from '@/contracts/user.contrcact';

export const ChatSchema = BaseSchema.extend(CreateChatSchema.shape).extend({
  members: UserSchema.array()
});

export type Chat = zod.infer<typeof ChatSchema>;
