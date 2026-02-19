import type { Signal, WritableSignal } from '@angular/core';
import {
  EnvironmentInjector,
  inject,
  Injectable,
  runInInjectionContext,
  signal,
} from '@angular/core';
import type { ZodSafeParseResult } from 'zod';

import { WebSocketService } from '@/shared';

import type { MessagePayload, NewMessagePayload, WriteMessagePayload } from '../models';
import { MessageSchema } from '../models';
import { prepareMessageToSending } from '../util';
import { MessagesRepository } from './messages.repository';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly messagesRepository: MessagesRepository = inject(MessagesRepository);
  private readonly injector: EnvironmentInjector = inject(EnvironmentInjector);

  private readonly _messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);

  constructor() {
    this.loadLocal().then();
  }

  private readonly activeSubscriptions: Set<number> = new Set<number>();

  public readonly messages: Signal<MessagePayload[]> = this._messages.asReadonly();

  public listenChat(chatId: number): void {
    if (this.activeSubscriptions.has(chatId)) return;
    this.activeSubscriptions.add(chatId);
    this.webSocketService
      .subscribe(`/topic/chat/${chatId}`)
      .subscribe(async (event: unknown): Promise<void> => {
        const result: ZodSafeParseResult<MessagePayload> = MessageSchema.safeParse(event);
        if (result.success) {
          const messages: MessagePayload[] = [...this._messages(), result.data];
          await this.messagesRepository.saveMessages(messages);
          this.loadLocal().then();
        }
      });
  }

  public stopListeningChat(chatId: number): void {
    if (!this.activeSubscriptions.has(chatId)) return;
    this.activeSubscriptions.delete(chatId);
    this.webSocketService.unsubscribe(`/topic/chat/${chatId}`);
  }

  public async writeMessage(payload: WriteMessagePayload, chatId: number): Promise<void> {
    const newMessage: NewMessagePayload = await runInInjectionContext(
      this.injector,
      async (): Promise<NewMessagePayload> => await prepareMessageToSending(payload),
    );
    this.webSocketService.send(`/chat.send/${chatId}`, newMessage);
  }

  public getActiveSubscriptions(): number[] {
    return Array.from(this.activeSubscriptions);
  }

  public isSubscribed(chatId: number): boolean {
    return this.activeSubscriptions.has(chatId);
  }

  private async loadLocal(): Promise<void> {
    const data: unknown = await this.messagesRepository.getMessages();
    const parsed: ZodSafeParseResult<MessagePayload[]> = MessageSchema.array().safeParse(data);
    if (parsed.success) {
      this._messages.set(parsed.data);
    }
  }
}
