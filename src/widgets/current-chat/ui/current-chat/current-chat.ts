import {Component, input, type InputSignal} from '@angular/core';
import {type Chat, ChatHead, MessageList} from '@/entity';
import {SendMessage} from '@/feature';

@Component({
  selector: 'app-current-chat',
  imports: [
    ChatHead,
    MessageList,
    SendMessage
  ],
  templateUrl: './current-chat.html',
  styleUrl: './current-chat.sass',
})
export class CurrentChat {
  public readonly currentChat: InputSignal<Chat> = input.required<Chat>();
}
