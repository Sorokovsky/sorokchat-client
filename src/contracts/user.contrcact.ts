import {z as zod} from 'zod';
import {RegisterPayloadSchema} from '@/contracts/register-payload.contract';
import {BaseSchema} from '@/contracts/base.contract';

export const UserSchema = BaseSchema.extend(RegisterPayloadSchema);

export type User = zod.infer<typeof UserSchema>;
