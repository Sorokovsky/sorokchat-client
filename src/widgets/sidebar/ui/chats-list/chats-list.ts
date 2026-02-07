import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/entity';
import {ChatCard} from '@/widgets/sidebar/ui/chat-card/chat-card';

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
