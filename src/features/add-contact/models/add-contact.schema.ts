import type { z as zod } from 'zod';

import { UserSchema } from '@/entities';
export const AddContactSchema = UserSchema.pick({ email: true });
export type AddContactPayload = zod.infer<typeof AddContactSchema>;
