import {z as zod} from 'zod';
import {BaseSchema} from '@/shared';
import {CreateChatSchema} from '@/entity/chat';
import {UserSchema} from '@/entity/user';

export const ChatSchema = BaseSchema.extend(CreateChatSchema.shape).extend({
  members: UserSchema.array()
});

export type Chat = zod.infer<typeof ChatSchema>;
