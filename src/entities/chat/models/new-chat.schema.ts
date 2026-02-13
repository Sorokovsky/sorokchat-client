import { z as zod } from 'zod';
export const NewChatSchema = zod.object({
  name: zod.string().nonempty({ message: "Чат має мати ім'я." }),
  description: zod.string().nonempty({ message: 'Опис чату має бути.' }),
});

export type NewChat = zod.infer<typeof NewChatSchema>;
