import {z as zod} from 'zod';
import {LoginPayloadScheme} from '@/contracts/login-payload';

export const RegisterPayloadScheme = LoginPayloadScheme.extend({
  firstName: zod.string(),
  lastName: zod.string(),
  middleName: zod.string(),
});

export type RegisterPayload = zod.infer<typeof RegisterPayloadScheme>;
