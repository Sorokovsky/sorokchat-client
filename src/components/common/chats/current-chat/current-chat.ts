import {Component, input, type InputSignal} from '@angular/core';
import {type Chat} from '@/contracts/chats/chat.contract';
import {ChatHead} from '@/components/common/chats/chat-head/chat-head';
import {MessageList} from '@/components/common/messages/message-list/message-list';
import {SendMessage} from '@/components/common/messages/send-message/send-message';

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
