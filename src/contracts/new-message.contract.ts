import {z as zod} from 'zod';

export const NewMessageSchema = zod.object({
  text: zod.string(),
});

export type NewMessagePayload = zod.infer<typeof NewMessageSchema>;
