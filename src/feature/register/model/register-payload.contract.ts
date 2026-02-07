import {z as zod} from 'zod';
import {LoginPayloadSchema} from '@/feature/login/models/login-payload';

export const RegisterPayloadSchema = LoginPayloadSchema.extend({
  firstName: zod.string(),
  lastName: zod.string(),
  middleName: zod.string(),
});

export type RegisterPayload = zod.infer<typeof RegisterPayloadSchema>;
