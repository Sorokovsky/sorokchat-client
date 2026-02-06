import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/contracts/chat.contract';
import {ChatCard} from '@/components/common/chat-card/chat-card';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatCard
  ],
  templateUrl: './chats-list.html',
  styleUrl: './chats-list.sass',
})
export class ChatsList {
  public readonly chats: InputSignal<Chat[]> = input.required<Chat[]>();

}
