import type { Chat } from '@/entities';
import type { BaseQuery } from '@/shared';

export type GetMyChats = BaseQuery<Chat[]>;
