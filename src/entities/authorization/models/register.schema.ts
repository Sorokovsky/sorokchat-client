import type { z as zod } from 'zod';

import { UserSchema } from '../../user/@x/authorization';

export const RegisterSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type RegisterPayload = zod.infer<typeof RegisterSchema>;
