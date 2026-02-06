import {Component, computed, type Signal} from '@angular/core';
import {type GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';
import {injectRouteParameter} from '@/injections/route-parameter.injection';
import {type Chat} from '@/contracts/chat.contract';

@Component({
  selector: 'app-chats-page',
  imports: [],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.sass',
})
export class ChatsPage {
  protected readonly chatId: Signal<string | null> = injectRouteParameter("chatId");
  private readonly chatsQuery: GetChatsByMe = injectGetChatsByMe();
  protected currentChat: Signal<Chat | null> = computed((): Chat | null => {
    const id: string | null = this.chatId();
    if (id === null) return null;
    if (Number.isNaN(id)) return null;
    const chat: Chat[] = this.chatsQuery.data() || [];
    return chat.find((item: Chat): boolean => item.id === Number(id)) ?? null;
  });
}
