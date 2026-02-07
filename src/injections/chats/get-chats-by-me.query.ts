import {type BaseQuery, injectBaseQuery} from '@/shared/api/base-query.injection';
import {QueryKeys} from '@/constants/external/query-keys.constants';
import {type Chat} from '@/contracts/chats/chat.contract';
import {ChatsService} from '@/entity/chat/api/chats.service';
import {inject} from '@angular/core';

export type GetChatsByMe = BaseQuery<Chat[]>

export function injectGetChatsByMe(): GetChatsByMe {
  const chatsService: ChatsService = inject(ChatsService);
  return injectBaseQuery(
    [QueryKeys.GET_CHATS_BY_ME],
    async (): Promise<Chat[]> => chatsService.getChatsByMe()
  );
}
