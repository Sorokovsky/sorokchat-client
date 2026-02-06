import {z as zod} from 'zod';
import {NewMessageSchema} from '@/contracts/messages/new-message.contract';
import {BaseSchema} from '@/contracts/utils/base.contract';

export const MessageSchema = NewMessageSchema.extend(BaseSchema.shape).omit({
  id: true
}).extend({
  mac: zod.string({message: "Мак підпис має бути рядком."}),
  authorId: zod.number({message: "Ідентифікатор користувача має бути числом."}),
  chatId: zod.number({message: "Ідентифікатор чату має бути числом."}),
});

export type Message = zod.infer<typeof MessageSchema>;
