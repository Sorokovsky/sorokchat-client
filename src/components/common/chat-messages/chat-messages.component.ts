import {Component, input, InputSignal} from '@angular/core';
import {Chat} from '@/contracts/chat.contract';

@Component({
  selector: 'app-chat-messages',
  imports: [],
  templateUrl: './chat-messages.component.html',
  styleUrl: './chat-messages.component.sass',
})
export class ChatMessagesComponent {
  public chat: InputSignal<Chat> = input.required<Chat>();
}
