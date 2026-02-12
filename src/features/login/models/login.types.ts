import type { LoginPayload, User } from '@/entities';
import type { BaseMutation } from '@/shared';

export type LoginMutation = BaseMutation<User, LoginPayload>;
