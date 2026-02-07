import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/contracts/chats/chat.contract';
import {ChatCard} from '@/components/layout/sidebar/chats/chat-card/chat-card';

@Component({
  selector: 'app-chat-list',
  imports: [
    ChatCard
  ],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.sass',
})
export class ChatsList {
  public readonly chats: InputSignal<Chat[]> = input.required<Chat[]>();

}
