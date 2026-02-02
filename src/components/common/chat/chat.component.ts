import {Component, input, InputSignal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';
import {ChatHeaderComponent} from '@/components/common/chat-header/chat-header.component';
import {ChatMessagesComponent} from '@/components/common/chat-messages/chat-messages.component';
import {ChatSendMessageComponent} from '@/components/common/chat-send-message/chat-send-message.component';

@Component({
  selector: 'app-chat',
  imports: [
    ChatHeaderComponent,
    ChatMessagesComponent,
    ChatSendMessageComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.sass',
})
export class ChatComponent {
  public chat: InputSignal<Chat> = input.required<Chat>();
}
