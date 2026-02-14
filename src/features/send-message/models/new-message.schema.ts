import { z as zod } from "zod";
export const NewMessageSchema = zod.object({
  text: zod.string().nonempty({ message: "Текст повідомлення має бути." })
});

export type NewMessagePayload = zod.infer<typeof NewMessageSchema>;
