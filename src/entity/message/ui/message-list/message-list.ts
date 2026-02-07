import {Component, computed, inject, input, type InputSignal, type Signal} from '@angular/core';
import {type Chat} from '@/entity/chat';
import {type Message, MessagesService} from '@/entity/message';
import {MessageItem} from '@/entity/message/ui';
import {type ChatMessage} from '@/entity/message/models';
import {type User} from '@/entity/user/model';

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
