import type { InferOutput } from 'valibot';
import { pick } from 'valibot';

import { UserSchema } from '../../user/@x/authorization';

export const LoginSchema = pick(UserSchema, ['nickname', 'password']);

export type LoginPayload = InferOutput<typeof LoginSchema>;
