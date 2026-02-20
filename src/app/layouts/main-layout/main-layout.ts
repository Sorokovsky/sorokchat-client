import type { EffectRef, Signal } from '@angular/core';
import { Component, computed, DestroyRef, effect, inject, untracked } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import type { Chat, GetMyChats } from '@/entities';
import { injectGetMyChats, MessagesService } from '@/entities';
import type { Mappings, Page } from '@/shared';
import { WebSocketService } from '@/shared';
import { Sidebar } from '@/widgets';

import { BOTTOM_LEFT_MENU, MAPPINGS, TOP_LEFT_MENU } from '../../data';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayout {
  private readonly messagesService: MessagesService = inject(MessagesService);
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly myChats: GetMyChats = injectGetMyChats();
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  protected readonly topLeftMenu: Page[] = TOP_LEFT_MENU;
  protected readonly bottomLeftMenu: Page[] = BOTTOM_LEFT_MENU;
  protected readonly mappings: Mappings = MAPPINGS;

  private readonly chats: Signal<Chat[]> = computed((): Chat[] => {
    const chats: Chat[] | undefined = this.myChats.data();
    return chats ? [...chats] : [];
  });

  private readonly chatSubscriptionEffect: EffectRef = effect((): void => {
    const currentChatsIndexes = new Set(this.chats().map((chat: Chat): number => chat.id));
    for (const subscribedId of this.messagesService.getActiveSubscriptions() ?? []) {
      if (!currentChatsIndexes.has(subscribedId)) {
        this.messagesService.stopListeningChat(subscribedId);
      }
    }

    untracked((): void => {
      for (const chat of this.chats()) {
        if (!this.messagesService.isSubscribed(chat.id)) {
          this.messagesService.listenChat(chat.id);
        }
      }
    });

    this.webSocketService.activate();

    this.destroyRef.onDestroy((): void => {
      const chats: Chat[] = this.myChats.data() ?? [];
      for (const chat of chats) {
        this.messagesService.stopListeningChat(chat.id);
      }
      this.webSocketService.deactivate();
    });
  });
}
