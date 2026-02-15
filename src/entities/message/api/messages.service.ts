import type { Signal, WritableSignal } from '@angular/core';
import { inject, Injectable, signal } from '@angular/core';

import { WebSocketService } from '@/shared';

import type { MessagePayload, WriteMessagePayload } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly _messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);

  public readonly messages: Signal<MessagePayload[]> = this._messages.asReadonly();

  public listenChat(chatId: number): void {
    this.webSocketService.subscribe(`/topic/chats/${chatId}`);
  }

  public writeMessage(payload: WriteMessagePayload): void {}
}
