import { z as zod } from "zod";

export const WriteMessageSchema = zod.object({
  text: zod.string().nonempty({ message: "Текст повідомлення має бути." })
});

export type WriteMessagePayload = zod.infer<typeof WriteMessageSchema>;
