import type { RegisterPayload } from '@/entities';
import type { BaseMutation } from '@/shared';

export type Register = BaseMutation<void, RegisterPayload>;
