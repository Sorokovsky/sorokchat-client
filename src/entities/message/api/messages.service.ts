import type { Signal, WritableSignal } from '@angular/core';
import { inject, Injectable, signal } from '@angular/core';
import type { ZodSafeParseResult } from 'zod';

import type { EncryptionService, SigningService } from '@/shared';
import {
  base64ToBuffer,
  bufferToBase64,
  ENCRYPTION_SERVICE,
  KeysInfrastructure,
  SIGNING_SERVICE,
  WebSocketService,
} from '@/shared';

import type { MessagePayload, NewMessagePayload, WriteMessagePayload } from '../models';
import { MessageSchema } from '../models';
import { MessagesRepository } from './messages.repository';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  private readonly signingService: SigningService = inject(SIGNING_SERVICE);
  private readonly messagesRepository: MessagesRepository = inject(MessagesRepository);
  private readonly keysInfrastructure: KeysInfrastructure = inject(KeysInfrastructure);

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
    const textBytes: ArrayBuffer = new TextEncoder().encode(payload.text).buffer;
    const sharedKey: string = await this.keysInfrastructure.getSharedKey();
    const keyBytes: ArrayBuffer = base64ToBuffer(sharedKey);
    const encryptedBytes: ArrayBuffer = await this.encryptionService.encrypt(textBytes, keyBytes);
    const signing: ArrayBuffer = await this.signingService.sign(encryptedBytes, keyBytes);
    const newMessage: NewMessagePayload = {
      text: bufferToBase64(encryptedBytes),
      mac: bufferToBase64(signing),
    };
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
