import type { Signal, WritableSignal } from '@angular/core';
import { inject, Injectable, signal } from '@angular/core';
import type { ZodSafeParseResult } from 'zod';

import type { EncryptionService, SigningService } from '@/shared';
import { SIGNING_SERVICE } from '@/shared';
import { ENCRYPTION_SERVICE, WebSocketService } from '@/shared';

import type { MessagePayload, NewMessagePayload, WriteMessagePayload } from '../models';
import { MessageSchema } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private static readonly SECRET_KEY: string = 'a8Vqd9QyabWjodNVlEW0R5E4vYg0fviL';

  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  private readonly signingService: SigningService = inject(SIGNING_SERVICE);

  private readonly _messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);
  private readonly activeSubscriptions: Set<number> = new Set<number>();

  public readonly messages: Signal<MessagePayload[]> = this._messages.asReadonly();

  public listenChat(chatId: number): void {
    if (this.activeSubscriptions.has(chatId)) return;
    this.activeSubscriptions.add(chatId);
    this.webSocketService.subscribe(`topic/chat/${chatId}`).subscribe((event: unknown): void => {
      const result: ZodSafeParseResult<MessagePayload> = MessageSchema.safeParse(event);
      if (result.success)
        this._messages.update((previous: MessagePayload[]): MessagePayload[] => {
          return [...previous, result.data];
        });
    });
  }

  public stopListeningChat(chatId: number): void {
    if (!this.activeSubscriptions.has(chatId)) return;
    this.activeSubscriptions.delete(chatId);
    this.webSocketService.unsubscribe(`topic/chat/${chatId}`);
  }

  public async writeMessage(payload: WriteMessagePayload, chatId: number): Promise<void> {
    const textBytes: ArrayBuffer = MessagesService.stringToBuffer(payload.text);
    const keyBytes: ArrayBuffer = MessagesService.stringToBuffer(MessagesService.SECRET_KEY);
    const encryptedBytes: ArrayBuffer = await this.encryptionService.encrypt(textBytes, keyBytes);
    const signing: ArrayBuffer = await this.signingService.sign(encryptedBytes, keyBytes);
    const newMessage: NewMessagePayload = {
      text: MessagesService.bufferToString(encryptedBytes),
      mac: MessagesService.bufferToString(signing),
    };
    this.webSocketService.send(`chat.send/${chatId}`, newMessage);
  }

  public getActiveSubscriptions(): number[] {
    return Array.from(this.activeSubscriptions);
  }

  public isSubscribed(chatId: number): boolean {
    return this.activeSubscriptions.has(chatId);
  }

  private static bufferToString(buffer: ArrayBuffer): string {
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(buffer);
  }

  private static stringToBuffer(plain: string): ArrayBuffer {
    const encoder = new TextEncoder();
    return encoder.encode(plain).buffer;
  }
}
