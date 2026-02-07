import {computed, type Signal} from '@angular/core';
import {type Chat, type GetChatsByMe, injectGetChatsByMe} from '@/entity/chat';
import {injectRouteParameter} from '@/shared';

export function injectCurrentChat(): Signal<Chat | null> {
  const chatId: Signal<string | null> = injectRouteParameter("chatId");
  const chatsQuery: GetChatsByMe = injectGetChatsByMe();
  return computed((): Chat | null => {
    const id: string | null = chatId();
    if (id === null) return null;
    if (Number.isNaN(id)) return null;
    const chat: Chat[] = chatsQuery.data() || [];
    return chat.find((item: Chat): boolean => item.id === Number(id)) ?? null;
  });

}
