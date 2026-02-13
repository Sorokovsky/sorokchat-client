import type { z as zod } from 'zod';

import { BaseSchema } from '@/shared';

import { UserSchema } from '../../user/@x/chat';
import { NewChatSchema } from './new-chat.schema';
export const ChatSchema = BaseSchema.extend(NewChatSchema.shape).extend({
  members: UserSchema.array(),
});

export type Chat = zod.infer<typeof ChatSchema>;
