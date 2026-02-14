import type { z as zod } from "zod";

import { BaseSchema } from "@/shared";

import { NewMessageSchema } from "./new-message.schema";

export const MessageSchema = BaseSchema.pick({
  createdAt: true,
  updatedAt: true
}).merge(NewMessageSchema);

export type MessagePayload = zod.infer<typeof MessageSchema>;
