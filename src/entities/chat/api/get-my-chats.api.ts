import { inject } from '@angular/core';

import { injectBaseQuery, QueryKeys } from '@/shared';

import type { GetProfileQuery } from '../../authorization/@x/chat';
import { injectGetProfile } from '../../authorization/@x/chat';
import type { Chat, GetMyChats } from '../models';
import { ChatsService } from './chats.service';

export function injectGetMyChats(): GetMyChats {
  const profile: GetProfileQuery = injectGetProfile();
  const service: ChatsService = inject(ChatsService);
  return injectBaseQuery(
    [QueryKeys.GET_MY_CHATS],
    async (): Promise<Chat[]> => await service.getChatsByMe(),
    false,
    !!profile.data()?.id,
  );
}
