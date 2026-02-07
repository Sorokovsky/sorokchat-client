import {Component, computed, inject, input, type InputSignal, type Signal} from '@angular/core';
import {type Chat} from '@/contracts/chats/chat.contract';
import {MessagesService} from '@/entity/message/api/messages.service';
import {type Message} from '@/contracts/messages/message.contract';
import {MessageItem} from '@/components/common/messages/message-item/message-item';
import {type ChatMessage} from '@/entity/message/models/chat-message.type';
import {type User} from '@/contracts/user/user.contrcact';

@Component({
  selector: 'app-message-list',
  imports: [
    MessageItem
  ],
  templateUrl: './message-list.html',
  styleUrl: './message-list.sass',
})
export class MessageList {
  public chat: InputSignal<Chat> = input.required<Chat>();
  private readonly messagesService: MessagesService = inject(MessagesService);

  protected messages: Signal<ChatMessage[]> = computed((): ChatMessage[] => this.messagesService
    .messages()
    .filter((message: Message): boolean => message.chatId === this.chat().id)
    .map((message: Message): ChatMessage => ({
      author: this.chat().members.find((user: User): boolean => user.id === message.authorId) || null,
      text: this.messagesService.decryptMessage(message).text,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      suggested: this.messagesService.verifyMessage(message)
    }))
  );

}
