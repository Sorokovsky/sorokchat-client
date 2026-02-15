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
  private static readonly SECRET_KEY: string = 'SECRET_KEY';

  private readonly webSocketService: WebSocketService = inject(WebSocketService);
  private readonly encryptionService: EncryptionService = inject(ENCRYPTION_SERVICE);
  private readonly signingService: SigningService = inject(SIGNING_SERVICE);

  private readonly _messages: WritableSignal<MessagePayload[]> = signal<MessagePayload[]>([]);

  public readonly messages: Signal<MessagePayload[]> = this._messages.asReadonly();

  public listenChat(chatId: number): void {
    this.webSocketService.subscribe(`/topic/chats/${chatId}`).subscribe((event: unknown): void => {
      const result: ZodSafeParseResult<MessagePayload> = MessageSchema.safeParse(event);
      if (result.success)
        this._messages.update((previous: MessagePayload[]): MessagePayload[] => {
          return [...previous, result.data];
        });
    });
  }

  public stopListeningChat(chatId: number): void {
    this.webSocketService.unsubscribe(`/topic/chats/${chatId}`);
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
    this.webSocketService.send(`/chats.send/${chatId}`, newMessage);
  }

  private static bufferToString(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    if ('toBase64' in bytes && typeof bytes.toBase64 === 'function') {
      return bytes.toBase64({ alphabet: 'base64url' });
    }

    const binary: string = String.fromCharCode(...bytes);

    return btoa(binary).replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '');
  }

  private static stringToBuffer(base64url: string): ArrayBuffer {
    try {
      if ('fromBase64' in Uint8Array && typeof Uint8Array.fromBase64 === 'function') {
        return Uint8Array.fromBase64(base64url, { alphabet: 'base64url' }).buffer;
      }

      let base64: string = base64url.replaceAll('-', '+').replaceAll('_', '/');
      while (base64.length % 4) base64 += '=';

      const binary = atob(base64);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return bytes.buffer;
    } catch {
      throw new Error('Невалідний base64url формат');
    }
  }
}
