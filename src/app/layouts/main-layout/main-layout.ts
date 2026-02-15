import type { EffectRef, OnDestroy, OnInit, Signal } from '@angular/core';
import { computed, effect, untracked } from '@angular/core';
import { Component, inject } from '@angular/core';
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
export class MainLayout implements OnInit, OnDestroy {
  private readonly messagesService: MessagesService = inject(MessagesService);
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly myChats: GetMyChats = injectGetMyChats();

  protected readonly topLeftMenu: Page[] = TOP_LEFT_MENU;
  protected readonly bottomLeftMenu: Page[] = BOTTOM_LEFT_MENU;
  protected readonly mappings: Mappings = MAPPINGS;

  private readonly chats: Signal<Chat[]> = computed((): Chat[] => this.myChats.data() ?? []);

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
  });

  public ngOnInit(): void {
    this.webSocketService.activate();
  }

  public ngOnDestroy(): void {
    for (const chat of this.chats()) {
      this.messagesService.stopListeningChat(chat.id);
    }
    this.webSocketService.deactivate();
  }
}
