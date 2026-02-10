import type { z as zod } from 'zod';

import { UserSchema } from '../../user/@x/authorization';

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type LoginPayload = zod.infer<typeof LoginSchema>;
