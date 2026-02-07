import {z as zod} from 'zod';

export const CreateChatSchema = zod.object({
  name: zod.string({message: "Ім'я чату повино бути"}),
  description: zod.string({message: "опис чату повинен бути"})
});

export type CreateChat = zod.infer<typeof CreateChatSchema>;
