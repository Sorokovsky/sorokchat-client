import {AES, HmacSHA256} from "crypto-js";
import {Injectable, OnInit, signal, WritableSignal} from '@angular/core';
import {Message, MessageSchema} from '@/contracts/message.contract';
import {NewMessage} from '@/contracts/new-message.contract';

@Injectable({
  providedIn: 'root',
})
export class MessagesService implements OnInit {
  private static readonly STORAGE_KEY: string = 'messages';

  private readonly messages: WritableSignal<Message[]> = signal<Message[]>([]);
  private readonly secretKey: string = "secretKey";

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
    const encryptedMessage: string = AES.encrypt(newMessage.text, this.secretKey).toString();
    const mac: string = HmacSHA256(encryptedMessage, this.secretKey).toString();
    const now = new Date();
    const message: Message = {
      text: encryptedMessage,
      chatId,
      authorId,
      mac,
      createdAt: now,
      updatedAt: now,
    }
    this.messages.update((oldMessages: Message[]): Message[] => [...oldMessages, message]);
    localStorage.setItem(MessagesService.STORAGE_KEY, JSON.stringify(this.messages()));
  }
}
