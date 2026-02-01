import {Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {Message, MessageSchema} from '@/contracts/message.contract';
import {NewMessage} from '@/contracts/new-message.contract';
import {AesCryptoService} from '@/services/aes-crypto.service';
import {HmacSigningService} from '@/services/hmac-signing.service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService implements OnInit {
  private static readonly STORAGE_KEY: string = 'messages';

  private readonly messages: WritableSignal<Message[]> = signal<Message[]>([]);
  private readonly secretKey: string = "secretKey";

  constructor(
    private readonly cryptoService: AesCryptoService,
    private readonly signingService: HmacSigningService,
  ) {
  }

  public ngOnInit(): void {
    const stringValue: string | null = localStorage.getItem(MessagesService.STORAGE_KEY);
    if (stringValue === null) return;
    const parsedValue: unknown = JSON.parse(stringValue);
    if (MessageSchema.array().safeParse(parsedValue)) {
      const messages: Message[] = parsedValue as Message[];
      this.messages.set(messages);
    }
  }

  public sendMessage(newMessage: NewMessage, chatId: number, authorId: number): void {
    this.updateMessages(this.buildMessage(newMessage, chatId, authorId));
  }

  private updateMessages(message: Message): void {
    this.messages.update((oldMessages: Message[]): Message[] => [...oldMessages, message]);
    localStorage.setItem(MessagesService.STORAGE_KEY, JSON.stringify(this.messages()));
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
}
