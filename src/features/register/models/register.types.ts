import type { RegisterPayload, User } from '@/entities';
import type { BaseMutation } from '@/shared';

export type RegisterMutation = BaseMutation<User, RegisterPayload>;
