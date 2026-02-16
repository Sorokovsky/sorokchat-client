import { z as zod } from 'zod';

import { BaseSchema } from '@/shared';

import { NewMessageSchema } from './new-message.schema';

export const MessageSchema = BaseSchema.pick({
  createdAt: true,
  updatedAt: true,
})
  .extend(NewMessageSchema.shape)
  .extend({
    chatId: zod.number({ message: 'Ідентифікатор автора повідомлення має бути числом.' }),
    authorId: zod.number({ message: 'Ідентифікатор чату має бути числом.' }),
  });

export type MessagePayload = zod.infer<typeof MessageSchema>;
