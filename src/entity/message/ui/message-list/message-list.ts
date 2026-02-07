import {Component, computed, inject, input, type InputSignal, type Signal} from '@angular/core';
import {type Chat} from '@/entity/chat/model/chat.contract';
import {MessagesService} from '@/entity/message/api/messages.service';
import {type Message} from '@/entity/message/models/message.contract';
import {MessageItem} from '@/entity/message/ui/message-item/message-item';
import {type ChatMessage} from '@/entity/message/models/chat-message.type';
import {type User} from '@/entity/user/model/user.contrcact';

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
