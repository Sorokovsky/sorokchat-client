import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Message, MessageSchema} from '@/contracts/message.contract';
import {NewMessage} from '@/contracts/new-message.contract';
import {AesCryptoService} from '@/services/aes-crypto.service';
import {HmacSigningService} from '@/services/hmac-signing.service';
import {ZodSafeParseResult} from 'zod';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private static readonly STORAGE_KEY: string = 'messages';

  private readonly _messages: WritableSignal<Message[]> = signal<Message[]>([]);
  private readonly secretKey: string = "secretKey";
  public messages: Signal<Message[]> = this._messages.asReadonly();

  constructor(
    private readonly cryptoService: AesCryptoService,
    private readonly signingService: HmacSigningService,
  ) {
    this.loadFromLocalStorage();
  }

  public sendMessage(newMessage: NewMessage, chatId: number, authorId: number): void {
    this.updateMessages(this.buildMessage(newMessage, chatId, authorId));
  }

  public decryptMessage(message: Message): Message {
    return {
      ...message,
      text: this.cryptoService.decrypt(message.text, this.secretKey)
    };
  }

  public verifyMessage(message: Message): boolean {
    return this.signingService.verify(message.text, this.secretKey, message.mac);
  }

  private updateMessages(message: Message): void {
    this._messages.update((oldMessages: Message[]): Message[] => [...oldMessages, message]);
    localStorage.setItem(MessagesService.STORAGE_KEY, JSON.stringify(this._messages()));
  }

  private buildMessage(newMessage: NewMessage, chatId: number, authorId: number): Message {
    const encryptedMessage: string = this.cryptoService.encrypt(newMessage.text, this.secretKey);
    const mac: string = this.signingService.sign(encryptedMessage, this.secretKey);
    const now = new Date();
    return {
      text: encryptedMessage,
      chatId,
      authorId,
      mac,
      createdAt: now,
      updatedAt: now,
    }
  }

  private loadFromLocalStorage(): void {
    const stringValue: string | null = localStorage.getItem(MessagesService.STORAGE_KEY);
    if (stringValue === null) return;
    const parsedValue: unknown = JSON.parse(stringValue);
    const result: ZodSafeParseResult<Message[]> = MessageSchema.array().safeParse(parsedValue);
    if (result.success) {
      this._messages.set(result.data);
    } else {
      console.error(result.error);
    }
  }
}
