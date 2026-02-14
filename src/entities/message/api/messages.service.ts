import type { Signal, WritableSignal } from "@angular/core";
import { inject, Injectable, signal } from "@angular/core";

import { WebSocketService } from "@/shared";

import { injectGetMyChats } from "../../chat/@x/message";
import type { Chat, GetMyChats } from "../../chat/@x/message";
import type { MessagePayload } from "../models";
import { MessageSchema } from "../models";

@Injectable({
  providedIn: "root"
})
export class MessagesService {
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly chats: GetMyChats = injectGetMyChats();
  protected readonly messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);

  public listen(): void {
    const chats: Chat[] = this.chats.data() || [];
    for (const chat of chats) {
      const payload: Signal<unknown> = this.webSocketService.subscribe<MessagePayload>(`/topic/chats/${chat.id}`);
      const result = MessageSchema.safeParse(payload());
      if (result.success) this.messages.update((prev: MessagePayload[]): MessagePayload[] => [...prev, result.data]);
    }
  }
};
