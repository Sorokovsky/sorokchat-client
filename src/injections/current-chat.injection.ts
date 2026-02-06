import {computed, type Signal} from '@angular/core';
import {type Chat} from '@/contracts/chat.contract';
import {injectRouteParameter} from '@/injections/route-parameter.injection';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';

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
