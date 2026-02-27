import type { InferOutput } from 'valibot';
import { pick } from 'valibot';

import { RegisterSchema } from './register.schema';

export const LoginSchema = pick(RegisterSchema, ['nickname', 'password']);

export type LoginPayload = InferOutput<typeof LoginSchema>;
