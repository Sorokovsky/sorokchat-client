import {Component, input, InputSignal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';

@Component({
  selector: 'app-chat-send-message',
  imports: [],
  templateUrl: './chat-send-message.component.html',
  styleUrl: './chat-send-message.component.sass',
})
export class ChatSendMessageComponent {
  public readonly chat: InputSignal<Chat> = input.required<Chat>();
  //protected readonly profile: ProfileQuery = injectProfileQuery();
}
