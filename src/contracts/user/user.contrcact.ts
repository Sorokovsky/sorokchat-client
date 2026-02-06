import {z as zod} from 'zod';
import {RegisterPayloadSchema} from '@/contracts/authorization/register-payload.contract';
import {BaseSchema} from '@/contracts/utils/base.contract';

export const UserSchema = BaseSchema.extend(RegisterPayloadSchema.shape);

export type User = zod.infer<typeof UserSchema>;
