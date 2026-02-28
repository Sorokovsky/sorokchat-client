import type { InferOutput } from 'valibot';
import { pick } from 'valibot';

import { UserSchema } from '../../user/@x/authorization';

export const RegisterSchema = pick(UserSchema, ['displayName', 'nickname', 'password']);

export type RegisterPayload = InferOutput<typeof RegisterSchema>;
