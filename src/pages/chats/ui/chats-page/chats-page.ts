import type { Signal } from '@angular/core';
import { computed } from '@angular/core';
import { Component } from '@angular/core';

import type { Chat, GetMyChats } from '@/entities';
import { injectGetMyChats } from '@/entities';
import { injectParameter } from '@/shared';

@Component({
  selector: 'app-chats-page',
  imports: [],
  templateUrl: './chats-page.html',
  styleUrl: './chats-page.scss',
})
export class ChatsPage {
  private readonly chatId: Signal<string | null> = injectParameter('chatId');
  private readonly chats: GetMyChats = injectGetMyChats();

  protected readonly chat: Signal<Chat | null> = computed((): Chat | null => {
    const chatId: string | null = this.chatId();
    if (chatId === null || Number.isNaN(chatId)) return null;
    const id: number = Number(chatId);
    const chats: Chat[] = this.chats.data() || [];
    return chats.find((chat: Chat): boolean => chat.id === id) || null;
  });
}
