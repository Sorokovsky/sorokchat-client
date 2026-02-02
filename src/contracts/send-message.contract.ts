import {MessageSchema} from '@/contracts/message.contract';
import {z as zod} from 'zod';

export const SendMessageSchema = MessageSchema.pick({
  text: true,
  mac: true
});
export type SendMessage = zod.infer<typeof SendMessageSchema>;
