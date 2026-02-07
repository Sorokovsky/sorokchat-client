import {z as zod} from 'zod';
import {RegisterPayloadSchema} from '@/feature/register/model/register-payload.contract';
import {BaseSchema} from '@/shared/models/base.contract';

export const UserSchema = BaseSchema.extend(RegisterPayloadSchema.shape);

export type User = zod.infer<typeof UserSchema>;
