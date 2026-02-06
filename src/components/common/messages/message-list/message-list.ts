import {Component, computed, inject, input, type InputSignal, type Signal} from '@angular/core';
import {type Chat} from '@/contracts/chats/chat.contract';
import {MessagesService} from '@/services/messages/messages.service';
import {type Message} from '@/contracts/messages/message.contract';
import {MessageItem} from '@/components/common/messages/message-item/message-item';

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
  protected messages: Signal<Message[]> = computed((): Message[] => this.messagesService
    .messages()
    .filter((message: Message): boolean => message.chatId === this.chat().id)
  );

}
