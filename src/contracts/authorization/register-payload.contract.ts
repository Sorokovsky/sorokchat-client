import {z as zod} from 'zod';
import {LoginPayloadSchema} from '@/contracts/authorization/login-payload';

export const RegisterPayloadSchema = LoginPayloadSchema.extend({
  firstName: zod.string(),
  lastName: zod.string(),
  middleName: zod.string(),
});

export type RegisterPayload = zod.infer<typeof RegisterPayloadSchema>;
