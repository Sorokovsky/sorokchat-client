import { z as zod } from "zod";

import { WriteMessageSchema } from "./write-message.schema";

export const NewMessageSchema = WriteMessageSchema.extend({
  mac: zod.string().nonempty({ message: "MAC підпис має бути." })
});

export type NewMessagePayload = zod.infer<typeof NewMessageSchema>;
