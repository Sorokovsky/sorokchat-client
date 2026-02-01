import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';
import {MessagesService} from '@/services/messages.service';
import {ChatMessage} from '@/components/common/chat-messages/chat-messages.type';
import {Message} from '@/contracts/message.contract';
import {User} from '@/contracts/user.contrcact';
import {injectProfileQuery, ProfileQuery} from '@/injections/profile.query';

@Component({
  selector: 'app-chat-messages',
  imports: [],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.sass',
})
export class ChatMessagesComponent {
  constructor(private readonly messagesService: MessagesService) {
  }

  public chat: InputSignal<Chat> = input.required<Chat>();

  protected readonly messages: Signal<ChatMessage[]> = computed<ChatMessage[]>((): ChatMessage[] => {
    const chat: Chat = this.chat();
    return this.messagesService.messages()
      .filter((message: Message): boolean => message.chatId == chat.id)
      .map((message: Message): ChatMessage => {
        return {
          author: chat.members.find((user: User): boolean => user.id === message.authorId) ?? null,
          text: this.messagesService.decryptMessage(message).text,
          suggested: this.messagesService.verifyMessage(message),
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        }
      });
  });
  private readonly profile: ProfileQuery = injectProfileQuery();

  protected isMyMessage(message: ChatMessage): boolean {
    return message.author?.id === this.profile.data()?.id;
  }
}
