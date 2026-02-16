import { z as zod } from 'zod';

import { UserSchema } from '../../user/@x/chat';
import { MessageSchema } from './message.schema';

export const ChatMessageSchema = MessageSchema.omit({
  mac: true,
  authorId: true,
}).extend({
  suggested: zod.boolean(),
  author: UserSchema.optional(),
});

export type ChatMessagePayload = zod.infer<typeof ChatMessageSchema>;
