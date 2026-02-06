import {MessageSchema} from '@/contracts/messages/message.contract';
import {z as zod} from 'zod';

export const SendMessageSchema = MessageSchema.pick({
  text: true,
  mac: true
});
export type SendMessage = zod.infer<typeof SendMessageSchema>;
