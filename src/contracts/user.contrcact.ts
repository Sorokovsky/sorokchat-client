import {RegisterPayload} from '@/contracts/register-payload.contract';
import {Base} from '@/contracts/base.contract';

export type User = Base & RegisterPayload;
