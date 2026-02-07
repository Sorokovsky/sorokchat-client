import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/entity/chat/model/chat.contract';
import {ChatHead} from '@/entity/chat/ui/chat-head/chat-head';
import {MessageList} from '@/entity/message/ui/message-list/message-list';
import {SendMessage} from '@/feature/send-message/ui/send-message/send-message';

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
