import type { LoginPayload } from '@/entities';
import type { BaseMutation } from '@/shared';

export type Login = BaseMutation<void, LoginPayload>;
