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
  public chat: InputSignal<Chat> = input.required<Chat>();
  protected readonly messages: Signal<ChatMessage[]> = computed<ChatMessage[]>((): ChatMessage[] => {
    return this.messagesService.messages()
      .map((message: Message): ChatMessage => {
        return {
          author: this.chat().members.find((user: User): boolean => user.id === message.authorId) ?? null,
          text: this.messagesService.decryptMessage(message).text,
          suggested: this.messagesService.verifyMessage(message),
          createdAt: message.createdAt,
          updatedAt: message.updatedAt,
        }
      });
  });
  private readonly profile: ProfileQuery = injectProfileQuery();

  constructor(private readonly messagesService: MessagesService) {
  }
}
