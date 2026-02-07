import {type BaseQuery, injectBaseQuery, QueryKeys} from '@/shared';
import {type Chat, ChatsService} from '@/entity/chat';
import {inject} from '@angular/core';

export type GetChatsByMe = BaseQuery<Chat[]>

export function injectGetChatsByMe(): GetChatsByMe {
  const chatsService: ChatsService = inject(ChatsService);
  return injectBaseQuery(
    [QueryKeys.GET_CHATS_BY_ME],
    async (): Promise<Chat[]> => chatsService.getChatsByMe()
  );
}
