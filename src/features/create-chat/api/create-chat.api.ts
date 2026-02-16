import { inject } from '@angular/core';

import type { Chat, NewChat } from '@/entities';
import { ChatsService } from '@/entities';
import { injectBaseMutation, QueryKeys } from '@/shared';

import type { CreateChat } from '../models';

export function injectCreateChat(): CreateChat {
  const service: ChatsService = inject(ChatsService);
  return injectBaseMutation(
    [QueryKeys.CREATE_CHAT],
    async (payload: NewChat): Promise<Chat> => await service.createChat(payload),
    [QueryKeys.GET_MY_CHATS],
  );
}
