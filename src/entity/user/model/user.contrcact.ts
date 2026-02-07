import {z as zod} from 'zod';
import {RegisterPayloadSchema} from '@/entity/authorization/model';
import {BaseSchema} from '@/shared';

export const UserSchema = BaseSchema.extend(RegisterPayloadSchema.shape);

export type User = zod.infer<typeof UserSchema>;
