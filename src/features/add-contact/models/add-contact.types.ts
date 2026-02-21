import type { User } from '@/entities';
import type { BaseMutation } from '@/shared';

export type AddContact = BaseMutation<User, string>;
