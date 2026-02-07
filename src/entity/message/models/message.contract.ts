import {z as zod} from 'zod';
import {NewMessageSchema} from '@/entity/message/models';
import {BaseSchema} from '@/shared';

export const MessageSchema = BaseSchema.omit({id: true})
  .merge(NewMessageSchema)
  .extend({
  mac: zod.string({message: "Мак підпис має бути рядком."}),
  authorId: zod.number({message: "Ідентифікатор користувача має бути числом."}),
  chatId: zod.number({message: "Ідентифікатор чату має бути числом."}),
});

export type Message = zod.infer<typeof MessageSchema>;
