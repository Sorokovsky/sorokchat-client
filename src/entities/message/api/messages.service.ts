import type { Signal, WritableSignal } from '@angular/core';
import { inject, Injectable, signal } from '@angular/core';
import type { ZodSafeParseResult } from 'zod';

import type { EncryptionService, SigningService } from '@/shared';
import { SIGNING_SERVICE } from '@/shared';
import { ENCRYPTION_SERVICE, WebSocketService } from '@/shared';

import type { Chat } from '../../chat/@x/message';
import type { User } from '../../user/@x/chat';
import type {
  ChatMessagePayload,
  MessagePayload,
  NewMessagePayload,
  WriteMessagePayload,
} from '../models';
import { MessageSchema } from '../models';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private static readonly SECRET_KEY: string = 'a8Vqd9QyabWjodNVlEW0R5E4vYg0fviL';
  private static readonly MESSAGES_KEYS: string = 'messages';

  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  private readonly signingService: SigningService = inject(SIGNING_SERVICE);

  private readonly _messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);

  constructor() {
    this.loadLocal();
  }

  private readonly activeSubscriptions: Set<number> = new Set<number>();

  public readonly messages: Signal<MessagePayload[]> = this._messages.asReadonly();

  public async prepareMessage(chat: Chat, message: MessagePayload): Promise<ChatMessagePayload> {
    const user: User | undefined = chat.members.find(
      (member: User): boolean => member.id === message.authorId,
    );
    const signingBuffer: ArrayBuffer = MessagesService.base64ToBuffer(message.mac);
    const encryptedBuffer: ArrayBuffer = MessagesService.base64ToBuffer(message.text);
    const keyBuffer: ArrayBuffer = new TextEncoder().encode(MessagesService.SECRET_KEY).buffer;
    const isSuggested: boolean = await this.signingService.verify(
      encryptedBuffer,
      keyBuffer,
      signingBuffer,
    );
    const decryptedBuffer: ArrayBuffer = await this.encryptionService.decrypt(
      encryptedBuffer,
      keyBuffer,
    );
    return {
      text: new TextDecoder().decode(decryptedBuffer),
      suggested: isSuggested,
      author: user,
      chatId: chat.id,
      updatedAt: message.updatedAt,
      createdAt: message.createdAt,
    };
  }

  public listenChat(chatId: number): void {
    if (this.activeSubscriptions.has(chatId)) return;
    this.activeSubscriptions.add(chatId);
    this.webSocketService.subscribe(`/topic/chat/${chatId}`).subscribe((event: unknown): void => {
      const result: ZodSafeParseResult<MessagePayload> = MessageSchema.safeParse(event);
      if (result.success) {
        const messages: MessagePayload[] = [...this._messages(), result.data];
        localStorage.setItem(MessagesService.MESSAGES_KEYS, JSON.stringify(messages));
        this.loadLocal();
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
    const keyBytes: ArrayBuffer = new TextEncoder().encode(MessagesService.SECRET_KEY).buffer;
    const encryptedBytes: ArrayBuffer = await this.encryptionService.encrypt(textBytes, keyBytes);
    const signing: ArrayBuffer = await this.signingService.sign(encryptedBytes, keyBytes);
    const newMessage: NewMessagePayload = {
      text: MessagesService.bufferToBase64(encryptedBytes),
      mac: MessagesService.bufferToBase64(signing),
    };
    this.webSocketService.send(`/chat.send/${chatId}`, newMessage);
  }

  public getActiveSubscriptions(): number[] {
    return Array.from(this.activeSubscriptions);
  }

  public isSubscribed(chatId: number): boolean {
    return this.activeSubscriptions.has(chatId);
  }

  private static base64ToBuffer(base64: string): ArrayBuffer {
    return Uint8Array.from(atob(base64), (character: string): number => character.charCodeAt(0))
      .buffer;
  }

  private static bufferToBase64(buffer: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buffer)));
  }

  private loadLocal(): void {
    const data: unknown = JSON.parse(localStorage.getItem(MessagesService.MESSAGES_KEYS) || '[]');
    const parsed: ZodSafeParseResult<MessagePayload[]> = MessageSchema.array().safeParse(data);
    if (parsed.success) {
      this._messages.set(parsed.data);
    }
  }
}
