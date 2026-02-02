import {Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Message, MessageSchema} from '@/contracts/message.contract';
import {NewMessage} from '@/contracts/new-message.contract';
import {AesCryptoService} from '@/services/aes-crypto.service';
import {HmacSigningService} from '@/services/hmac-signing.service';
import {ZodSafeParseResult} from 'zod';
import {WebSocketService} from '@/services/web-socket.service';
import {SendMessage} from '@/contracts/send-message.contract';
import {GetChatsByMe, injectGetChatsByMe} from '@/injections/get-chats-by-me.query';
import {Chat} from '@/contracts/chat.contract';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private static readonly STORAGE_KEY: string = 'messages';

  private readonly _messages: WritableSignal<Message[]> = signal<Message[]>([]);
  private readonly chats: GetChatsByMe = injectGetChatsByMe();
  private readonly secretKey: string = "secretKey";
  public messages: Signal<Message[]> = this._messages.asReadonly();

  constructor(
    private readonly cryptoService: AesCryptoService,
    private readonly signingService: HmacSigningService,
    private readonly webSocketService: WebSocketService,
  ) {
    this.loadFromLocalStorage();
    this.webSocketService.connect();
    this.listenAllChats();
  }

  public sendMessage(newMessage: NewMessage, chatId: number): void {
    this.webSocketService.send<SendMessage>(`/chat.send/${chatId}`, this.buildMessage(newMessage));
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

  private buildMessage(newMessage: NewMessage): SendMessage {
    const encryptedText: string = this.cryptoService.encrypt(newMessage.text, this.secretKey);
    const mac: string = this.signingService.sign(encryptedText, this.secretKey);
    return {
      text: encryptedText,
      mac
    }
  }

  private onMessageReceived(message: Message): void {
    this._messages.update((oldMessages: Message[]): Message[] => [...oldMessages, message]);
    localStorage.setItem(MessagesService.STORAGE_KEY, JSON.stringify(this.messages()));
  }

  private listenAllChats(): void {
    const myChats: Chat[] = this.chats.data() || [];
    for (const chat of myChats) {
      this.webSocketService.subscribe<Message>(`/topic/chat/${chat.id}`)
        .subscribe(this.onMessageReceived.bind(this));
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
