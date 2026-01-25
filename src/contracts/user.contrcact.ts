import {z as zod} from 'zod';
import {RegisterPayloadScheme} from '@/contracts/register-payload.contract';
import {BaseScheme} from '@/contracts/base.contract';

export const UserScheme = BaseScheme.extend(RegisterPayloadScheme);

export type User = zod.infer<typeof UserScheme>;
