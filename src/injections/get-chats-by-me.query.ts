import {BaseQuery, injectBaseQuery} from '@/injections/base-query.injection';
import {QueryKeys} from '@/constants/query-keys.constants';
import {Chat} from '@/contracts/chat.contract';
import {ChatsService} from '@/services/chats.service';
import {inject} from '@angular/core';

export type GetChatsByMe = BaseQuery<Chat[]>

export function injectGetChatsByMe(): GetChatsByMe {
  const chatsService: ChatsService = inject(ChatsService);
  return injectBaseQuery(
    [QueryKeys.GET_CHATS_BY_ME],
    async (): Promise<Chat[]> => chatsService.getChatsByMe()
  );
}
